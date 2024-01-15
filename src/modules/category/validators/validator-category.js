const Joi = require("joi");
const handleFieldErrors = require('./../../../utils/handleFileErrors');
const { Validation } = require("./../../../utils/apiResponse");
const errorValidationMessages = require('./../../../utils/errorValidationMessages');
const fileSchema = require("../../../common/validationsModel/file-schema");
const validatorCategory = () => {
    return (req, res, next) => {
        const data = { ...req.body, ...req.files }

        const schema = Joi.object({
            logo: fileSchema.max(1).required(),
            type: Joi.string().required()
        });

        const { error, value } = schema.validate(data, { abortEarly: false });

        if (error) {
            const errorResponse = handleFieldErrors(error, errorValidationMessages?.[req.ln]);
            return Validation(res, errorResponse)
        }

        next()
    }
};


module.exports = validatorCategory;