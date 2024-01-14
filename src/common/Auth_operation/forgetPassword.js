const wrap = require('express-async-wrapper')
const { Success, ApiError } = require('./../../utils/apiResponse')
const { generateSecret, generateOTP } = require('./../../utils/otpService')
const emailService = require('./../../utils/emailService')
const checkEmailDB = require('./../DB_operation/checkEmailDB')
const generateToken = require('./../../utils/generateToken')

const forgetPassword = (Model) => wrap(
    async (req, res, next) => {
        const { email } = req.body
        const isEmailExist = await checkEmailDB(Model, email)
        if (!isEmailExist) {
            return next(new ApiError("Email not registered", 404));
        }
        const otpSecret = generateSecret();
        const otp = generateOTP(otpSecret);
        await emailService.sendVerificationEmail(email, otp);
        const token = await generateToken({ otpSecret }, process.env.VERIFICATION_SECRET_TOKEN, "2m")
        return Success(res, 'Check your email for the OTP', { token })
    }
)


module.exports = forgetPassword