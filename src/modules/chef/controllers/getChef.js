const wrap = require('express-async-wrapper')
const { success } = require('./../../../utils/apiResponse')
const Chef = require('../chef.model')


const getChef = wrap(async (req, res, next) => {
    const chef = await Chef.find({})
    success(res, "OK", chef)
})


module.exports = getChef