import { NextFunction, Request, Response } from 'express';
import Vacation from '../../models/Vacation';

export async function createVacation(req: Request, res: Response, next: NextFunction) {
    try {
        const newVacation = await Vacation.create({
            ...req.body,
            file: req.imageUrl || null,
        });

        await newVacation.reload();
        res.json(newVacation);
    } catch (e) {
        next(e);
    }
}

export async function updateVacation(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const vacation = await Vacation.findByPk(id);

        const data = { ...req.body };

        if (req.body.image) {
            data.image = req.body.image;
        }

        await vacation.update(data);
        res.json(vacation);
    } catch (e) {
        next(e);
    }
}

export async function deleteVacation(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const deletedVacation = await Vacation.destroy({ where: { id } });
        if (!deletedVacation) return new Error('No vacation was found.');
        res.json({ success: true });
    } catch (e) {
        next(e);
    }
}
