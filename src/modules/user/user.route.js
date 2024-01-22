const express = require('express');
const register = require('./controllers/auth/register');
const login = require('./controllers/auth/login');
const checkEmail = require('./controllers/auth/checkEmail');
const verifyEmail = require('../../common/Auth_operation/verifyEmail');
const validateRequest = require('../../middlewares/validateRequest');
const loginSchema = require('./../../common/validationsModel/login-schema')
const verifyEmailSchema = require('./../../common/validationsModel/verifyEmail-schema')
const checkEmailSchema = require('./../../common/validationsModel/checkEmail-schema');
const validatorRegister = require('./validators/validator-register');
const forgetPassword = require('./controllers/auth/forgetPassword');
const { multerConfig } = require('./../../utils/multer');
const restPassword = require('./controllers/auth/restPassword');
const changePassword = require('./controllers/auth/changePassword');
const resendCode = require('../../common/Auth_operation/resendCode');
const restPasswordSchema = require('../../common/validationsModel/restPassword');
const changePasswordSchema = require('../../common/validationsModel/changePassword');
const getUser = require('./controllers/get_user');
const userRouter = express.Router({ mergeParams: true });
const addToFavorites = require('./controllers/favorites/add_to_favorites')
const removeFromFavorites = require('./controllers/favorites/remove_from_favorites');
const validateParamsId = require('../../middlewares/validateParamsId');
const getFavorites = require('./controllers/favorites/get_favorites');




userRouter.route('/register')
    .post(multerConfig().array(), validatorRegister(), register);

userRouter.route('/login')
    .post(multerConfig().array(), validateRequest(loginSchema), login);

userRouter.route('/check-email')
    .post(multerConfig().array(), validateRequest(checkEmailSchema), checkEmail);

userRouter.route('/verify-email')
    .post(multerConfig().array(), validateRequest(verifyEmailSchema), verifyEmail);

userRouter.route('/forget-password')
    .post(multerConfig().array(), validateRequest(checkEmailSchema), forgetPassword);

userRouter.route('/rest-password')
    .post(multerConfig().array(), validateRequest(restPasswordSchema), restPassword);

userRouter.route('/change-password')
    .post(multerConfig().array(), validateRequest(changePasswordSchema), changePassword);

userRouter.route('/resend-code')
    .post(multerConfig().array(), validateRequest(checkEmailSchema), resendCode);




// userRouter.route('/')
// // .get(getAllUsers)

userRouter.route('/current-user')
    // .patch( updateUser)
    .get(getUser);

// userRouter.route('/get-user/:id')
//     .get(validateParamsId(), getUser);
// // // .delete(deleteUser)

// userRouter.route('/favorites')
//     .get(getFavorites)

// userRouter.route('/favorites/:id')
//     .post(validateParamsId(), addToFavorites)
//     .delete(validateParamsId(), removeFromFavorites);


module.exports = userRouter;
