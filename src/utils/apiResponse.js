
const Success = (res, message = "OK", results, statusCode = 200) => {
    return res.status(statusCode).json({
        message,
        results
    });
};


class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error';
        this.isOperational = true;
    }
}


const Validation = (res, errors) => {
    return res.status(422).json({
        errors
    });
};



module.exports = {
    Success,
    ApiError,
    Validation
}




