const wrap = require('express-async-wrapper')
const { Success } = require('../../../utils/apiResponse')
const Chef = require('../chef.model')
const { chefFilter } = require('../../../utils/filters')
const ApiFeatures = require('./../../../utils/apiFeatures')


const getAllChefs = wrap(
    async (req, res, next) => {
        const { mongooseQuery, page } = new ApiFeatures(Chef.find({}, { ...chefFilter }), req.query)
            .pagination()
            .filter()
            .sort()
            .select()

        const chefs = await mongooseQuery

        return Success(res, "Ok", { chefs });
    }
)

module.exports = getAllChefs