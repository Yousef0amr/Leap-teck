const Joi = require("joi");
const handleFieldErrors = require('./../../../utils/handleFileErrors');
const { Validation } = require("../../../utils/apiResponse");
const errorValidationMessages = require('./../../../utils/errorValidationMessages')


const validatorRegister = () => {
    return (req, res, next) => {
        const data = { ...req.body }
        console.log(req.body)

        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            phone: Joi.string().optional(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
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
