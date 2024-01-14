const wrap = require('express-async-wrapper')
const User = require('./../../user.model');
const { Success } = require('../../../../utils/apiResponse');

const getFavorites = wrap(
    async (req, res, next) => {
        const user = await User.findById(req.userId).populate('favorites')
        return Success(res, "OK", { favorites: user.favorites })
    }
)



module.exports = getFavorites