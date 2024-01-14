const wrap = require('express-async-wrapper')
const create = require('./../../../common/DB_operation/CRUD/create')
const Review = require('./../review.model')
const { Success, ApiError } = require('../../../utils/apiResponse')
const addReview = wrap(
    async (req, res, next) => {
        const value = { ...req.body }
        const studioId = req.params.id
        const userId = req.userId

        const isReviewed = await Review.findOne({ studio: id, user: userId })
        if (isReviewed) {
            return next(new ApiError("studio already reviewed", 400))
        }
        value.studio = studioId;
        value.user = userId
        const review = await create(Review, value)

        return Success(res, "added review successfully", { review })
    }
)


module.exports = addReview