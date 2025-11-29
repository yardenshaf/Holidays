import Joi from 'joi';

export const vacationValidator = Joi.object({
    id: Joi.string().uuid(),
});
