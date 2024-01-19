const wrap = require('express-async-wrapper')
const { Success, ApiError } = require('./../../../../utils/apiResponse')
const Admin = require('./../../admin.model')
const hashPassword = require("./../../../../utils/hashPassword")
const generateToken = require('./../../../../utils/generateToken')
const checkEmailDB = require('../../../../common/DB_operation/checkEmailDB')

const register = wrap(
    async (req, res, next) => {
        const value = { ...req.body }

        const isAdminExist = await checkEmailDB(Admin, value.email)
        if (isAdminExist) {
            return next(new ApiError("Email is already registered", 400));
        }


        value.password = await hashPassword(value.password)

        const admin = new Admin({
            ...value
        });
        await admin.save();

        const payload = { id: admin._id, role: admin.role };
        const token = await generateToken(payload, process.env.ACCESS_TOKEN_SECRET);

        return Success(res, "OK", { token }, 201);
    }
)

module.exports = register