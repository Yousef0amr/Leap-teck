const express = require('express');
const addReview = require('./controllers/add_review');
const deleteReview = require('./controllers/delete_review');
const updateReview = require('./controllers/update_review');

const reviewRouter = express.Router();


reviewRouter.route('/:id')
    .post(addReview)
    .delete(deleteReview)
    .patch(updateReview)



module.exports = reviewRouter