import { NextFunction, Request, Response } from 'express';
import Vacation from '../../models/Vacation';
import User from '../../models/User';
import Like from '../../models/Like';

export async function allVacations(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const vacations = await Vacation.findAll({
            include: {
                model: User,
                as: 'likedBy',
            },
        });

        const results = vacations.map((vacation) => ({
            ...vacation.get(),
            likesCount: vacation.likedBy.length,
        }));

        res.json(results);
    } catch (err) {
        next(err);
    }
}
