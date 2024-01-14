const Joi = require("joi");

const login = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(20),
});

module.exports = login







