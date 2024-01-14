const Joi = require("joi");
const handleFieldErrors = require('./../../../utils/handleFileErrors')

const validatorLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });

    const { error, value } = schema.validate(data, { abortEarly: false });

    if (error) {
        const errorResponse = handleFieldErrors(error, [
            { fieldName: 'email', errorMessage: 'Invalid email address format.' },
            { fieldName: 'password', errorMessage: "Invalid password" }
        ]);

        return { error: errorResponse, value };

    }
    return { error: false, value };
};



module.exports = validatorLogin;
