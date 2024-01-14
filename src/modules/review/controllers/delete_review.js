
const wrap = require('express-async-wrapper')
const Review = require('./../review.model')

const { Success, ApiError } = require('../../../utils/apiResponse')


const deleteReview = wrap(
    async (req, res, next) => {
        const reviewId = req.params.id

        const review = await Review.findByIdAndDelete(reviewId)
        if (!review) {
            return next(new ApiError("studio not reviewed", 400))
        }
        review.remove()

        return Success(res, "deleted review successfully", null)
    }
)


module.exports = deleteReview