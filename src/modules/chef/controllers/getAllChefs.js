const wrap = require('express-async-wrapper')
const { Success } = require('../../../utils/apiResponse')
const Chef = require('../validators/chef.model')
const { chefFilter } = require('../../../utils/filters')
const ApiFeatures = require('./../../../utils/apiFeatures')


const getAllChefs = wrap(
    async (req, res, next) => {

        const api = new ApiFeatures(Chef.find({}, { ...chefFilter }), req.query)
            .pagination()
            .filter(req.body.filterOptions)
            .sort()
            .select()



        const chefs = await api.mongooseQuery

        return Success(res, "Ok", { chefs });
    }
)

module.exports = getAllChefs