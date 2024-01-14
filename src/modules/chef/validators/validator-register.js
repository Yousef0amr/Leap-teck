const Joi = require("joi");
const handleFieldErrors = require('./../../../utils/handleFileErrors')
const validatorRegister = (data) => {
    const schema = Joi.object({
        personalInfo: Joi.object({
            name: Joi.string().min(3).required(),
            phone: Joi.string().regex(/^\d{10}$/).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            confirmPassword: Joi.ref('password')
        }),
        businessInfo: Joi.object({
            logo: Joi.optional(),
            name: Joi.string().min(3).required(),
            deliveryNumber: Joi.string().required(),
            address: Joi.string().required(),
            description: Joi.string().required(),
            frontId: Joi.optional(),
            backId: Joi.optional(),
        }),
    });

    const { error, value } = schema.validate(data, { abortEarly: false });

    if (error) {
        const errorResponse = handleFieldErrors(error, [
            { fieldName: 'confirmPassword', errorMessage: 'Password and Confirm Password must match.' },
            { fieldName: 'phone', errorMessage: 'Invalid phone number format.' },
            { fieldName: 'email', errorMessage: 'Invalid email address format.' },

        ]);
        return { error: errorResponse, value };
    }
    return { error: false, value };
};


module.exports = validatorRegister;
