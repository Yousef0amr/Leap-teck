const mongoose = require('mongoose');
const setting = require('./../../config/schemaConfig');
const Meal = require('./../meal/meal.model');
const Chef = require('./../chef/chef.model');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reviewedItemType: {
        type: String,
        enum: ['meal', 'chef'],
        required: true,
    },
    reviewedItem: {
        type: mongoose.Types.ObjectId,
        refPath: 'reviewedItemType',
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
    },
}, setting);

reviewSchema.pre(/^find/, function (next) {
    this.populate({ path: 'user', select: 'name' });
    next();
});

reviewSchema.statics.calcAvgRatingsAndQuantityRatings = async function (reviewedItemType, reviewedItemId) {
    const result = await this.aggregate([
        { $match: { reviewedItemType: reviewedItemType, reviewedItem: reviewedItemId } },
        { $group: { _id: 'reviewedItem', avgRatings: { $avg: '$ratings' }, ratingsQuantity: { $sum: 1 } } },
    ]);

    const updateData = result[0] || { avgRatings: 0, ratingsQuantity: 0 };

    // Assuming Meal and Chef models have their own update methods
    if (reviewedItemType === 'meal') {
        await Meal.findByIdAndUpdate(reviewedItemId, {
            ratingsAvg: updateData.avgRatings,
            ratingsQuantity: updateData.ratingsQuantity,
        });
    } else if (reviewedItemType === 'chef') {
        await Chef.findByIdAndUpdate(reviewedItemId, {
            ratingsAvg: updateData.avgRatings,
            ratingsQuantity: updateData.ratingsQuantity,
        });
    }
};

reviewSchema.post('save', async function () {
    await this.constructor.calcAvgRatingsAndQuantityRatings(this.reviewedItemType, this.reviewedItem);
});

reviewSchema.post('remove', async function () {
    await this.constructor.calcAvgRatingsAndQuantityRatings(this.reviewedItemType, this.reviewedItem);
});

module.exports = mongoose.model('Review', reviewSchema);
