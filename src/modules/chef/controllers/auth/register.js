const wrap = require('express-async-wrapper')
const { Success, Error, Validation } = require('./../../../../utils/apiResponse')
const Chef = require('./../../chef.model')
const validator_register = require('../../validators/validator-register')
const hashPassword = require("./../../../../utils/hashPassword")
const generateToken = require('./../../../../utils/generateToken')


const register = wrap(
    async (req, res, next) => {
        //validation data
        const { error, value } = validator_register(req.body)
        if (error) {
            Validation(res, error)
        }
        //check if user registered
        const isUserExist = await Chef.findOne({ 'personalInfo.email': value.personalInfo.email })
        if (isUserExist) {
            Error(res, "Email is already registered", 400);
        }
        //clean data
        delete value.personalInfo.confirmPassword
        //hashing password
        value.personalInfo.password = await hashPassword(value.personalInfo.password)
        //create new chef
        const chef = new Chef({
            ...value
        });
        await chef.save();
        //generate token
        const payload = { id: chef._id, username: chef.personalInfo.name };
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

module.exports = register