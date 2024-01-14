const express = require('express');
const addOrder = require('./controllers/add_order');
const removeOrder = require('./controllers/remove_order');
const updateOrder = require('./controllers/update_order');
const validateOrder = require('./validators/validate-order')
const validateParamsId = require('./../../middlewares/validateParamsId')
const orderRouter = express.Router();



orderRouter.route('/')
    .post(validateOrder(), addOrder)
    .patch(validateParamsId(), updateOrder)
    .delete(validateParamsId(), removeOrder)


module.exports = orderRouter