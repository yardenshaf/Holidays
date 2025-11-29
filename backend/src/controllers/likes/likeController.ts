import e, { NextFunction, Request, Response } from 'express';
import User from '../../models/User';
import Vacation from '../../models/Vacation';
import Like from '../../models/Like';
import { io } from 'socket.io-client';

// Connect to the io service
const socket = io('http://holidays-io-compose:3004');

export async function likeVacation(req: Request<{ vacationId: string }>, res: Response, next: NextFunction) {
    try {
        const { vacationId } = req.params;
        const { userId } = req.body;

        const exists = await Like.findOne({ where: { userId, vacationId } });
        if (exists) {
            const count = await Like.count({ where: { vacationId } });
            return res.json({ likesCount: count, alreadyLiked: true });
        }

        await Like.create({ userId, vacationId });

        const likesCount = await Like.count({ where: { vacationId } });

        const from = (req.headers['x-client-id'] as string) || 'backend';
        socket.emit('NewLike', { vacationId, userId, likesCount, from });

        res.json({ likesCount });
    } catch (err) {
        next(err);
    }
}

export async function unlikeVacation(req: Request<{ vacationId: string }>, res: Response, next: NextFunction) {
    try {
        const { vacationId } = req.params;
        const { userId } = req.body;

        await Like.destroy({ where: { userId, vacationId } });

        const likesCount = await Like.count({ where: { vacationId } });

        const from = (req.headers['x-client-id'] as string) || 'backend';
        socket.emit('RemoveLike', { vacationId, userId, likesCount, from });

        res.json({ likesCount });
    } catch (err) {
        next(err);
    }
}

export async function getUserLikes(req: Request<{ userId: string }>, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId, {
            include: [
                {
                    model: Vacation,
                    as: 'likedVacations',
                    attributes: ['id'],
                    through: { attributes: [] },
                },
            ],
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const likedVacations = user.likedVacations.map((vacation) => vacation.id);
        res.json(likedVacations);
    } catch (e) {
        next(e);
    }
}

export async function getLikesDistribution(req: Request, res: Response, next: NextFunction) {
    try {
        const likes = await Like.findAll({ attributes: ['vacationId'] });

        const counts = likes.reduce((acc, like) => {
            if (acc[like.vacationId]) {
                acc[like.vacationId] += 1;
            } else {
                acc[like.vacationId] = 1;
            }
            return acc;
        }, {} as { [key: string]: number });

        const vacations = await Vacation.findAll({ where: { id: Object.keys(counts) }, attributes: ['id', 'destination'] });

        const result = vacations.map((vacation) => ({
            destination: vacation.destination,
            likes: counts[vacation.id] || 0,
        }));

        res.json(result);
    } catch (e) {
        next(e);
    }
}
