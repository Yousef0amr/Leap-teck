const { generateSecret, generateOTP } = require('./../../utils/otpService')
const { Success } = require('./../../utils/apiResponse')
const wrap = require('express-async-wrapper')
const emailService = require('./../../utils/emailService')

const resendCode = wrap(
    async (req, res, next) => {
        const { email } = req.body
        const otpSecret = generateSecret();
        const otp = generateOTP(otpSecret);
        await emailService.sendVerificationEmail(email, otp);
        return Success(res, 'Check your email for the OTP', { token: otpSecret })
    }
)

module.exports = resendCode