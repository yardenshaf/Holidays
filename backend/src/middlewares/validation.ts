import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export default function validateRequest(schema: ObjectSchema, target: 'body' | 'params' | 'query' = 'body') {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req[target] = await schema.validateAsync(req[target]);
            next();
        } catch (error: any) {
            next({ status: 422, message: error.message });
        }
    };
}
