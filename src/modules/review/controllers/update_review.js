const wrap = require('express-async-wrapper')
const Review = require('./../review.model')

const { Success, ApiError } = require('../../../utils/apiResponse')


const updateReview = wrap(
    async (req, res, next) => {
        const reviewId = req.params.id
        const value = { ...req.body }
        const review = await Review.findByIdAndUpdate(reviewId, { ...value })
        if (!review) {
            return next(new ApiError("studio not reviewed", 400))
        }
        review.save()

        return Success(res, "updated review successfully", null)
    }
)


module.exports = updateReview