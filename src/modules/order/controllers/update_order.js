const wrap = require('express-async-wrapper')
const Order = require('./../order.model')
const { Success } = require('../../../utils/apiResponse')

const updateOrder = wrap(
    async (req, res, next) => {
        const value = { ...req.body }
        const id = req.query.id
        const order = await Order.findByIdAndUpdate(id, { ...value }, { new: true })
        return Success(res, "updated successfully", { order })
    }
)


module.exports = updateOrder