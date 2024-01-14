const wrap = require('express-async-wrapper')
const { Success, ApiError } = require('./../../../../utils/apiResponse')
const User = require('./../../user.model')
const hashPassword = require("./../../../../utils/hashPassword")
const generateToken = require('./../../../../utils/generateToken')
const CryptoJS = require("crypto-js");
const cloudinary = require('./../../../../config/cloudinary')
const { v4: uuidv4 } = require('uuid');
const checkEmailDB = require('../../../../common/DB_operation/checkEmailDB')
const transformLocation = require('./../../../../utils/tranformLocation')
const register = wrap(
    async (req, res, next) => {
        const value = { ...req.body }
        const files = req.files

        const isUserExist = await checkEmailDB(User, value.email)
        if (isUserExist) {
            return next(new ApiError("Email is already registered", 400));
        }

        const logo = await cloudinary.uploader.upload(files.logo[0].path, {
            folder: `carWashing/user/logo`,
            public_id: uuidv4(),
            use_filename: true,
            unique_filename: true,
            resource_type: "auto"
        })
        const images = await Promise.all(files.car_images.map(async file => {
            const image = await cloudinary.uploader.upload(file.path, {
                folder: `carWashing/user/car_images`,
                public_id: uuidv4(),
                use_filename: true,
                unique_filename: true,
                resource_type: "auto"
            });

            return `${image.public_id}`;
        }));


        value.logo = `${logo.public_id}`
        value.car_images = images
        value.password = await hashPassword(value.password)
        value.phone = CryptoJS.AES.encrypt(value.phone, process.env.ENCRYPTION_PHONE_KEY).toString()
        value.location = transformLocation(value.location)
        const user = new User({
            ...value
        });

        await user.save();

        const payload = { id: user.id, role: user.role };
        const token = await generateToken(payload, process.env.ACCESS_TOKEN_SECRET);

        return Success(res, "OK", { token }, 201);
    }
)

module.exports = register