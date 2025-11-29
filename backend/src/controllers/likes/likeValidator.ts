import Joi from 'joi';

export const likeValidator = Joi.object({
    userId: Joi.string().uuid(),
    vacationId: Joi.string().uuid(),
});

export const unlikeValidator = likeValidator;
