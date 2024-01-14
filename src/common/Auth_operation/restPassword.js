const { Success } = require("./../../utils/apiResponse")
const hashPassword = require("./../../utils/hashPassword")
const wrap = require('express-async-wrapper')


const restPassword = (Model) => wrap(
    async (req, res) => {
        const { email, newPassword } = req.body
        const password = await hashPassword(newPassword)
        await Model.findOneAndUpdate({ email: email }, { password: password })
        return Success(res, "Password has been changed successfully", { email })
    }
)




module.exports = restPassword