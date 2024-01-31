const { Success, ApiError } = require("./../../utils/apiResponse")
const hashPassword = require("./../../utils/hashPassword")
const wrap = require('express-async-wrapper')
const verifyPassword = require('./../../utils/verifyPassword')


const changePassword = (Model) => wrap(
    async (req, res, next) => {
        const { oldPassword, newPassword } = req.body
        const id = req.userId;
        const user = await Model.findById(id);
        const isValid = await verifyPassword(oldPassword, user.password);
        if (!isValid) {
            return next(new ApiError("Invalid password", 400));
        }
        const password = await hashPassword(newPassword)

        user.password = password;
        await user.save();

        return Success(res, "Password has been changed successfully", { email: user.email })
    }
)




module.exports = changePassword