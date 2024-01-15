const wrap = require('express-async-wrapper')
const Category = require('../category.model')
const { Success } = require('../../../utils/apiResponse')
const create = require('../../../common/DB_operation/CRUD/create')
const cloudinary = require('./../../../config/cloudinary')
const { v4: uuidv4 } = require('uuid');
const addCategory = wrap(
    async (req, res, next) => {
        const value = { ...req.body }
        const files = req.files


        const logo = await cloudinary.uploader.upload(files.logo[0].path, {
            folder: `carWashing/services/logo`,
            public_id: uuidv4(),
            use_filename: true,
            unique_filename: true,
            resource_type: "auto"
        })

        value.logo = `${logo.public_id}`
        const category = await create(Category, value)

        return Success(res, { category })
    }
)


module.exports = addCategory