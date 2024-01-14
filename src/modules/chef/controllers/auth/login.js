const Chef = require('./../../chef.model')
const wrap = require('express-async-wrapper')
const generateToken = require('./../../../../utils/generateToken')
const { Success, Error, Validation } = require('./../../../../utils/apiResponse')
const validator_login = require('./../../validators/validator-login')
const verifyPassword = require('../../../../utils/verifyPassword')



const login = wrap(
    async (req, res, next) => {
        const { error, value } = validator_login(req.body);
        if (error) {
            Validation(res, error)
        }

        const user = await Chef.findOne({ "personalInfo.email": value.email });
        if (!user) {
            Error(res, "Invalid password or email", 400);
        }

        const isValid = await verifyPassword(value.password, user.personalInfo.password);
        if (!isValid) {
            Error(res, "Invalid password or email", 400);
        }

        const payload = { id: user._id, username: user.personalInfo.name };
        const accessToken = generateToken(payload);
        //put cookie
        res.cookie("jwt", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        //send res
        Success(res, "OK", { accessToken });
    }
)


module.exports = login