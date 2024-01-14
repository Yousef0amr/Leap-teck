const wrap = require('express-async-wrapper')
const Order = require('./../order.model');
const { Success } = require('../../../utils/apiResponse');

const removeOrder = wrap(
    async (req, res, next) => {
        const id = req.query.id;
        await Order.findByIdAndDelete(id)
        return Success(res, "Dleted Succesfully", null)
    }
)


module.exports = removeOrder