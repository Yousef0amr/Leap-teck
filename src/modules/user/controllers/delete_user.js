const wrap = require('express-async-wrapper')
const { Success } = require('./../../../utils/apiResponse')
const User = require('./../user.model')


const deleteUser = wrap(
    async (req, res, next) => {
        const id = req.userId
        await User.findByIdAndDelete(id)

        return Success(res, "user deleted successfully", null)
    }
)


module.exports = deleteUser