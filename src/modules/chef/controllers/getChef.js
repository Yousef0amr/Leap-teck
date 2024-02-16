const wrap = require('express-async-wrapper')
const { success } = require('./../../../utils/apiResponse')
const Chef = require('../validators/chef.model')
const { chefFilter } = require('../../../utils/filters')


const getChef = wrap(async (req, res, next) => {
    const chef = await Chef.findById(req.userId, { ...chefFilter })
    success(res, "OK", chef)
})


module.exports = getChef