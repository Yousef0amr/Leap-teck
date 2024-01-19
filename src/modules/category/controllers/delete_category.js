const wrap = require('express-async-wrapper')
const Category = require('../category.model')
const { Success } = require('../../../utils/apiResponse')

const deleteCategory = wrap(
    async (req, res, next) => {
        const id = req.params.id

        await Category.findByIdAndDelete(id);

        return Success(res, "category deleted successfully")
    }
)


module.exports = deleteCategory