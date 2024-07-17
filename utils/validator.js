const Joi = require('joi');

const getSchema = (type) => {
    switch (type) {
        case 'register': {
            return Joi.object().keys({
                username: Joi.string().required().min(4),
                password: Joi.string().required().min(8),
                email:Joi.string().required().email(),
                mobile: Joi.string().required(),
                role: Joi.number()
            })
        }
        case 'login': {
            return Joi.object().keys({
                username: Joi.string().required(),
                password: Joi.string().required().min(8),
            })
        }
        default: {
            return null;
        }
    }
} 

module.exports = (type) => (req, res, next) => {
    const schema = getSchema(type);
    if (schema) {
        const result = schema.validate(req.body);
        if (result.error) {
            const { details } = result.error;
            const message = details[0].message.replace(/"|'/g, '');
            return res.status(400).json({
                error: message
            });
        }
    }
    next();
}