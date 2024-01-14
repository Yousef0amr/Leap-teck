const Joi = require('joi')

const handleFieldErrors = require('./../../../utils/handleFileErrors');
const { Validation } = require("../../../utils/apiResponse");
const errorValidationMessages = require('./../../../utils/errorValidationMessages')


const validatorReview = () => {
    return (req, res, next) => {
        const data = { ...req.body }

        const schema = Joi.object({
            rating: Joi.string().required(),
            comment: Joi.string().optional(),
        });

        const { error, value } = schema.validate(data, { abortEarly: false });

        if (error) {
            const errorResponse = handleFieldErrors(error, errorValidationMessages?.[req.ln]);
            return Validation(res, errorResponse)
        }

        next()
    }
};


module.exports = validatorReview;
