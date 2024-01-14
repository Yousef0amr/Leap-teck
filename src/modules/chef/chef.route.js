const express = require('express');
const getChef = require('./controllers/getChef');
const register = require('./controllers/auth/register');
const login = require('./controllers/auth/login');
const { AUTH } = require('../../utils/endPoints');
const chefRouter = express.Router();



chefRouter.route('/')
    .get(getChef);

chefRouter.route(AUTH.register)
    .post(register);

chefRouter.route(AUTH.login)
    .post(login)



module.exports = chefRouter;




