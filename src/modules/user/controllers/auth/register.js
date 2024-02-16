const wrap = require('express-async-wrapper')
const { Success, ApiError } = require('./../../../../utils/apiResponse')
const User = require('./../../user.model')
const hashPassword = require("./../../../../utils/hashPassword")
const generateToken = require('./../../../../utils/generateToken')
const CryptoJS = require("crypto-js");
const checkEmailDB = require('../../../../common/DB_operation/checkEmailDB')

const register = wrap(
    async (req, res, next) => {
        const value = { ...req.body }
        console.log(value)
        const isUserExist = await checkEmailDB(User, value.email)
        if (isUserExist) {
            return next(new ApiError("Email is already registered", 400));
        }

        value.password = await hashPassword(value.password)
        value.phone = CryptoJS.AES.encrypt(value.phone, process.env.ENCRYPTION_PHONE_KEY).toString()

        const user = new User({
            ...value
        });

        await user.save();

        const payload = { id: user.id, role: user.role };
        const token = await generateToken(payload, process.env.ACCESS_TOKEN_SECRET);

        return Success(res, "OK", { token }, 201);
    }
)

module.exports = register