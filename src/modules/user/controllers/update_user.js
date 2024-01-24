const wrap = require('express-async-wrapper')
const { Success } = require('./../../../utils/apiResponse')
const User = require('./../user.model')
const { userFilter } = require('./../../../utils/filters')
const CryptoJS = require("crypto-js");

const updateUser = wrap(
    async (req, res, next) => {
        const id = req.userId
        const value = { ...req.body }
        if (req.body.phone) {
            value.phone = CryptoJS.AES.encrypt(value.phone, process.env.ENCRYPTION_PHONE_KEY).toString()
        }


        const user = await User.findByIdAndUpdate(id, value, { ...userFilter })

        return Success(res, "user updated successfully", { user })
    }
)


module.exports = updateUser