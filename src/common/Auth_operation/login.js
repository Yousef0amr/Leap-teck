const wrap = require('express-async-wrapper')
const generateToken = require('./../../utils/generateToken')
const { Success, ApiError } = require('./../../utils/apiResponse')
const verifyPassword = require('./../../utils/verifyPassword')

const login = (Model) => wrap(
    async (req, res, next) => {
        const value = req.body
        const user = await Model.findOne({ email: value.email });
        if (!user) {
            return next(new ApiError("Invalid password or email", 400));
        }
        const isValid = await verifyPassword(value.password, user.password);
        if (!isValid) {
            return next(new ApiError("Invalid password or email", 400));
        }
        user.isLoggedIn = true;
        await user.save()
        const payload = { id: user.id, role: user.role };
        const token = await generateToken(payload, process.env.ACCESS_TOKEN_SECRET);
        return Success(res, "OK", { token });
    }
)


module.exports = login