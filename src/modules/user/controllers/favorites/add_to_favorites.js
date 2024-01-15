const wrap = require('express-async-wrapper')
const User = require('./../../user.model');
const Chef = require('./../../../chef/chef.model')
const { ApiError, Success } = require('../../../../utils/apiResponse');

const addToFavorites = wrap(
    async (req, res, next) => {
        const id = req.params.id;
        const chef = await Chef.findById(id);
        if (!chef) {
            return next(new ApiError("Studio not founded", 404))
        }
        const user = await User.findOneAndUpdate(
            { _id: req.userId, 'favorites': { $nin: id } },
            { $addToSet: { favorites: id } },
            { new: true }
        ).populate('favorites');
        if (!user) {
            return next(new ApiError("Studio already in favorites", 400))
        }
        return Success(res, "Added to favorites successfully", { favorites: user.favorites })
    }
)



module.exports = addToFavorites