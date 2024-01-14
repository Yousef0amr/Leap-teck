const Joi = require("joi");


const checkEmail = Joi.object({
    email: Joi.string().email().required()
});


module.exports = checkEmail