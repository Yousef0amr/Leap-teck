const Joi = require("joi");
const handleFieldErrors = require('./../../../utils/handleFileErrors');
const { Validation } = require("../../../utils/apiResponse");
const errorValidationMessages = require('./../../../utils/errorValidationMessages')

const validateOrder = () => {
    return (req, res, next) => {
        const data = { ...req.body }

        const schema = Joi.object({
            studio: Joi.string().required(),
            services: Joi.array().min(1).required(),
            date: Joi.date().required()
        });

        const { error, value } = schema.validate(data, { abortEarly: false });

        if (error) {
            const errorResponse = handleFieldErrors(error, errorValidationMessages?.[req.ln]);
            return Validation(res, errorResponse)
        }

        next()
    }
};


module.exports = validateOrder;
