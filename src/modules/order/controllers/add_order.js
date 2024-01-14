const wrap = require('express-async-wrapper')
const Order = require('./../order.model')
const { Success } = require('../../../utils/apiResponse')

const addOrder = wrap(
    async (req, res, next) => {
        const value = { ...req.body }
        value.user = req.userId
        const order = new Order({
            ...value
        });

        await order.save();

        return Success(res, "order added successfully", { order })
    }
)


module.exports = addOrder