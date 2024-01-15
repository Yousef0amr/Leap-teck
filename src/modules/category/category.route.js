const express = require('express');
const addCategory = require('./controllers/add_category');
const getAllCategory = require('./controllers/getAllCategories');
const updateCategory = require('./controllers/update_category');
const deleteCategory = require('./controllers/delete_service');
const validateService = require('./validators/validator-category');
const validateParamsId = require('../../middlewares/validateParamsId');
const { multerConfig } = require('./../../utils/multer')

const categoryRouter = express.Router();

categoryRouter.route("/")
    .post(multerConfig().fields([
        { name: 'logo', maxCount: 1 }
    ]), validateService(), addCategory)
    .get(getAllCategory)

categoryRouter.route("/:id")
    .patch(validateParamsId(), updateCategory)
    .delete(validateParamsId(), deleteCategory)


module.exports = categoryRouter