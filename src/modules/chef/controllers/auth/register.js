const wrap = require('express-async-wrapper')
const { Success, ApiError } = require('./../../../../utils/apiResponse')
const Chef = require('./../../chef.model')
const hashPassword = require("./../../../../utils/hashPassword")
const generateToken = require('./../../../../utils/generateToken')
const checkEmailDB = require('../../../../common/DB_operation/checkEmailDB')
const CryptoJS = require("crypto-js");

const register = wrap(
    async (req, res, next) => {
        const value = { ...req.body, ...req.files }
        const isUserExist = await checkEmailDB(value.personalInfo.email);
        if (isUserExist) {
            next(new ApiError("Email is already registered", 400));
        }

        value.personalInfo.password = await hashPassword(value.personalInfo.password)
        value.personalInfo.phone = CryptoJS.AES.encrypt(value.phone, process.env.ENCRYPTION_PHONE_KEY).toString()

        const chef = new Chef({
            ...value
        });
        await chef.save();

        const payload = { id: chef._id, role: chef.role };
        const token = generateToken(payload);
        //put cookie

        Success(res, "OK", { token });
    }
)

module.exports = register