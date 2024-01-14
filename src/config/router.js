const express = require('express');
const routerOutlet = express.Router()
const endPoints = require('./../utils/endPoints')
const studioRouter = require('../modules/studio/studio.route');
const userRouter = require('../modules/user/user.route');
const adminRouter = require('../modules/admin/admin.route');
const carRouter = require('../modules/car/car.route');
const serviceRouter = require('../modules/service/service.route');
const orderRouter = require('../modules/order/order.route');


routerOutlet.use(endPoints.STUDIO, studioRouter)//update - cloudnairy 
routerOutlet.use(endPoints.USER, userRouter)//update - cloudnairy 
routerOutlet.use(endPoints.ADMIN, adminRouter)//update - cloudnairy 
routerOutlet.use(endPoints.CAR, carRouter)//update - cloudnairy 
routerOutlet.use(endPoints.SERVICE, serviceRouter)//update - cloudnairy
routerOutlet.use(endPoints.ORDER, orderRouter)



module.exports = routerOutlet