const Joi = require('@hapi/joi')

const registervalidation = (body)=>{
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(16).required(),
    });
    return schema.validate(body);
}

const loginvalidation = (body)=>{
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(16).required(),
    });
    return schema.validate(body);
}
module.exports.registervalidation = registervalidation
module.exports.loginvalidation = loginvalidation