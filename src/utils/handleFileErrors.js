const handleFieldErrors = (error, fields) => {
    const fieldErrors = fields
        .map(({ fieldName, errorMessage }) => {
            const fieldError = error.details.find(detail => detail.path.includes(fieldName));
            return fieldError ? { fieldName, errorMessage } : null;
        })
        .filter(Boolean);

    if (fieldErrors.length > 0) {
        return fieldErrors;
    }

    return null;
};


module.exports = handleFieldErrors