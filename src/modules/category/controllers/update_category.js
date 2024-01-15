const wrap = require('express-async-wrapper')
const Category = require('../category.model')
const { Success } = require('../../../utils/apiResponse')
const updateByID = require('../../../common/DB_operation/CRUD/updateByID')

const updateCategory = wrap(
    async (req, res, next) => {
        const id = req.params.id
        const value = { ...req.body }
        const category = await updateByID(Category, id, value);

        return Success(res, "service updated successfully", category)
    }
)


module.exports = updateCategory