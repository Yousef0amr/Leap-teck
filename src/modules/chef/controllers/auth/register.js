const wrap = require('express-async-wrapper')
const { Success, ApiError } = require('./../../../../utils/apiResponse')
const Chef = require('../../validators/chef.model')
const hashPassword = require("./../../../../utils/hashPassword")
const generateToken = require('./../../../../utils/generateToken')
const checkEmailDB = require('../../../../common/DB_operation/checkEmailDB')
const CryptoJS = require("crypto-js");
const uploadMedia = require('../../../../utils/uploadMedia')
const tranformLocation = require('../../../../utils/tranformLocation')

const register = wrap(
    async (req, res, next) => {
        const value = { ...req.body }
        const files = req.files

        const isUserExist = await checkEmailDB(Chef, value['personalInfo.email']);
        if (isUserExist) {
            return next(new ApiError("Email is already registered", 400));
        }

        value['businessInfo.logo'] = await uploadMedia(files['businessInfo.logo'][0].path, "leapTeck/chef/logo")
        value['businessInfo.frontId'] = await uploadMedia(files['businessInfo.frontId'][0].path, "leapTeck/chef/frontId")
        value['businessInfo.backId'] = await uploadMedia(files['businessInfo.backId'][0].path, "leapTeck/chef/backId")
        value['businessInfo.healthCertificate'] = await uploadMedia(files['businessInfo.healthCertificate'][0].path, "leapTeck/chef/healthCertificate")
        value['personalInfo.password'] = await hashPassword(value['personalInfo.password'])
        value['personalInfo.phone'] = CryptoJS.AES.encrypt(value['personalInfo.phone'], process.env.ENCRYPTION_PHONE_KEY).toString()

        value['businessInfo.location'] = tranformLocation(value['businessInfo.location'])

        console.log(value)
        const chef = new Chef({
            ...value
        });
        await chef.save();

        const payload = { id: chef._id, role: chef.role };
        const token = await generateToken(payload);

        return Success(res, "OK", { token });
    }
)

module.exports = register