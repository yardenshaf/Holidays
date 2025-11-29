import Joi from 'joi';

export const newVacationValidator = Joi.object({
    destination: Joi.string().min(3).max(40).required(),
    description: Joi.string().min(20).required(),
    id: Joi.string().uuid(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().min(Joi.ref('startDate')).required(),
    price: Joi.number().min(0).required(),
    file: Joi.object({
        originalname: Joi.string().optional(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png').optional(),
        size: Joi.number()
            .max(5 * 1024 * 1024)
            .optional(),
    }).optional(),
});

export const updateVacationValidator = Joi.object({
    destination: Joi.string().min(3).max(40).optional(),
    description: Joi.string().min(20).optional(),
    startDate: Joi.date().iso().optional(),
    endDate: Joi.date().iso().min(Joi.ref('startDate')).optional(),
    price: Joi.number().min(0).optional(),
    file: Joi.object({
        originalname: Joi.string().optional(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png').optional(),
        size: Joi.number()
            .max(5 * 1024 * 1024)
            .optional(),
    }).optional(),
});

export const deleteVacationValidator = Joi.object({
    id: Joi.string().uuid().required(),
});

export const newPostImageValidator = Joi.object({
    image: Joi.object({
        mimetype: Joi.string().valid('image/jpeg', 'image/png').optional(),
    })
        .unknown(true)
        .optional(),
});
