import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import config from 'config';
import User from '../models/User';

declare global {
    namespace Express {
        interface Request {
            userId: string;
            userRoleId: string;
        }
    }
}

export default function enforceAuth(requireAdmin = false) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const jwtSecret = config.get<string>('app.jwtSecret');
        const authHeader = req.get('Authorization');

        if (!authHeader) {
            return next({
                status: 401,
                message: 'missing Authorization header',
            });
        }

        if (!authHeader.startsWith('Bearer ')) {
            return next({
                status: 401,
                message: 'missing Bearer keyword',
            });
        }

        const parts = authHeader.split(' ');
        const jwt = parts[1];

        if (!jwt) {
            return next({
                status: 401,
                message: 'missing jwt',
            });
        }

        try {
            const decoded = verify(jwt, jwtSecret) as any;
            req.userId = decoded.id;
            req.userRoleId = decoded.roleId;

            if (requireAdmin) {
                const user = await User.findByPk(req.userId, { include: ['role'] });
                if (!user || user.role.name !== 'admin') {
                    return next({
                        status: 403,
                        message: 'Admin privileges required',
                    });
                }
            }

            next();
        } catch (e) {
            next({
                status: 401,
                message: 'invalid jwt',
            });
        }
    };
}
