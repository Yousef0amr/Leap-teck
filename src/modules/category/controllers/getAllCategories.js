const wrap = require('express-async-wrapper')
const Category = require('../category.model')
const { Success } = require('../../../utils/apiResponse')
const getAll = require('../../../common/DB_operation/CRUD/getAll')

const getAllCategory = wrap(
    async (req, res, next) => {
        const categories = await getAll(Category)
        return Success(res, "OK", { categories })
    }
)


module.exports = getAllCategory