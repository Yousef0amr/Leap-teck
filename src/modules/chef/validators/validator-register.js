const Joi = require("joi");
const handleFieldErrors = require('./../../../utils/handleFileErrors');
const { Validation } = require("../../../utils/apiResponse");
const errorValidationMessages = require('./../../../utils/errorValidationMessages')


const validatorRegister = () => {
    return (req, res, next) => {
        const data = { ...req.body }

        const schema = Joi.object({
            personalInfo: Joi.object({
                name: Joi.string().min(3).required(),
                phone: Joi.string().regex(/^\d{10}$/).required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(8).required()
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
            const errorResponse = handleFieldErrors(error, errorValidationMessages?.[req.ln]);
            return Validation(res, errorResponse)
        }

        next()
    }
};


module.exports = validatorRegister;




