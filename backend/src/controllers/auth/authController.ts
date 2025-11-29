import { NextFunction, Request, Response } from 'express';
import User from '../../models/User';
import config from 'config';
import { createHmac } from 'crypto';
import { sign } from 'jsonwebtoken';

function hashAndSaltPassword(plainTextPassword: string): string {
    const secret = config.get<string>('app.secret');
    return createHmac('sha256', secret).update(plainTextPassword).digest('hex');
}

export async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const userRoleId = 'd3b77258-bf28-11f0-b771-8ae0895f41e6';
        const jwtSecret = config.get<string>('app.jwtSecret');
        const { firstName, lastName, password, email } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return next({
                status: 409,
                message: 'Email is taken.',
            });
        }

        const userData = {
            firstName,
            lastName,
            email,
            password: hashAndSaltPassword(password),
            roleId: userRoleId, // extra protection, so if someone were to send req.body.role = "adminId" in the request, this is an override.
        };
        const user = await User.create(userData);
        const plainData = user.get({ plain: true });
        delete plainData.password;

        const jwt = sign(plainData, jwtSecret);

        res.json({ jwt });
    } catch (e) {
        next(e);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const jwtSecret = config.get<string>('app.jwtSecret');

        const user = await User.findOne({
            where: {
                email: req.body.email,
                password: hashAndSaltPassword(req.body.password),
            },
        });
        if (!user) throw new Error('invalid username and/or password');
        const plainData = user.get({ plain: true });
        delete plainData.password;
        const jwt = sign(plainData, jwtSecret);
        res.json({ jwt });
    } catch (e) {
        if (e.message === 'invalid username and/or password')
            return next({
                status: 401,
                message: 'no entry for you',
            });
        next(e);
    }
}
