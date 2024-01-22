const wrap = require('express-async-wrapper')
const { Success, ApiError } = require('./../../utils/apiResponse')
const { generateSecret, generateOTP } = require('./../../utils/otpService')
const emailService = require('./../../utils/emailService')
const checkEmailDB = require('./../DB_operation/checkEmailDB')


const checkEmail = (Model) => wrap(
    async (req, res, next) => {

        const { email } = req.body
        const isEmailExist = await checkEmailDB(Model, email)
        if (isEmailExist) {
            return next(new ApiError("Email is already registered", 400));
        }
        const otpSecret = generateSecret();
        const otp = generateOTP(otpSecret);

        await emailService.sendVerificationEmail(email, otp);

        return Success(res, 'Check your email for the OTP', { token: otpSecret })
    }
)

module.exports = checkEmail