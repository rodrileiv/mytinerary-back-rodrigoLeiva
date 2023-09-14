import Joi from "joi";

let signinSchema = Joi.object({
    mail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        "string.base": "email must be a string",
        "string.email": "email is invalid",
        'any.required': "email is required",
        "string.empty": "email is required",

    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8}$')).required().min(8).messages({
        "string.base": "password must be a string",
        'string.min': "password must be 8 characters please!",
        "string.pattern.base": "password must contain letters, numbers and capital letters",
        'any.required': "password is required",
        "string.empty": "password is required",
    }),
})
export default signinSchema