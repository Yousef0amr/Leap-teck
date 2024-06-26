const wrap = require('express-async-wrapper')
const { Success } = require('./../../../utils/apiResponse')
const User = require('./../user.model')
const { userFilter } = require('./../../../utils/filters')
const CryptoJS = require("crypto-js");

const updateUser = wrap(
    async (req, res, next) => {
        const id = req.userId;
        const value = { ...req.body };

        if (value.phone) {
            value.phone = CryptoJS.AES.encrypt(value.phone, process.env.ENCRYPTION_PHONE_KEY).toString();
        }

        const user = await User.findByIdAndUpdate(id, { ...value }, { new: true, select: '-_id name phone email signWithGoogle' });
        user.phone = CryptoJS.AES.decrypt(user.phone, process.env.ENCRYPTION_PHONE_KEY).toString(CryptoJS.enc.Utf8)
        return Success(res, "user updated successfully", { user });
    }
);



module.exports = updateUser