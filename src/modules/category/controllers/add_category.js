const wrap = require('express-async-wrapper')
const Category = require('../category.model')
const { Success } = require('../../../utils/apiResponse')
const create = require('../../../common/DB_operation/CRUD/create')
const uploadMedia = require('../../../utils/uploadMedia')

const addCategory = wrap(
    async (req, res, next) => {
        const value = { ...req.body }
        const files = req.files

        value.logo = await uploadMedia(files.logo[0].path, `leapTeck/categories/logo`)
        const category = await create(Category, value)

        return Success(res, 'added Category successfully', { category })
    }
)


module.exports = addCategory