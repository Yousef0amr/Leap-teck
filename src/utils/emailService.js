const nodemailer = require('nodemailer');
const otpTemplate = require('./otpTemplate')
const path = require('path')




const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});

async function sendVerificationEmail(email, otp) {

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'OTP Verification',
        html: otpTemplate(email, otp),
        attachments: [
            {
                filename: 'whiteLeapTeck.png',
                path: path.join(__dirname, './../public/whiteLeapTeck.png'),
                cid: 'logo',
            },
        ],
    };

    await transporter.sendMail(mailOptions);
}

module.exports = {
    sendVerificationEmail,
};
