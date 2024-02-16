const wrap = require('express-async-wrapper')
const { Success, ApiError } = require('../../utils/apiResponse')
const { verifyOTP } = require('../../utils/otpService')


const verifyEmail = wrap(
    async (req, res, next) => {
        const value = { ...req.body }
        const isValid = verifyOTP(value.token, value.otpSecret);
        if (isValid) {
            return Success(res, 'Email verified successfully')
        } else {
            return next(new ApiError('OTP is Invalid', 400))
        }
    }
)

module.exports = verifyEmail