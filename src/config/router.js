const express = require('express');
const routerOutlet = express.Router()
const endPoints = require('./../utils/endPoints')
const chefRouter = require('../modules/chef/chef.route');
const userRouter = require('../modules/user/user.route');
const adminRouter = require('../modules/admin/admin.route');
const orderRouter = require('../modules/order/order.route');
const categoryRouter = require('../modules/category/category.route');


routerOutlet.use(endPoints.CHEF, chefRouter)//update - cloudnairy 
routerOutlet.use(endPoints.USER, userRouter)//update - cloudnairy 
routerOutlet.use(endPoints.ADMIN, adminRouter)//update - cloudnairy 
routerOutlet.use(endPoints.ORDER, orderRouter)
routerOutlet.use(endPoints.CATEGORY, categoryRouter)



module.exports = routerOutlet