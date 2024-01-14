const mongoose = require('mongoose');
const setting = require('./../../config/schemaConfig');
const Studio = require('./../studio/studio.model')
const reviewSchema = new mongoose.Schema({
    studio: {
        type: mongoose.Types.ObjectId,
        ref: 'Studio',
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
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


reviewSchema.pre('/*find/', (next) => {
    this.populate({ path: 'user', select: 'name' })
})

reviewSchema.statics.calcAvgRatingsAndQuentityRatings = async (studioId) => {
    const result = await this.aggregate(
        [
            { $match: { studio: studioId } },
            { $group: { _id: "studio", avgRatings: { $avg: '$ratings' }, ratingsQuentity: { $sum: 1 } } }
        ]
    )

    if (result) {
        await Studio.findByIdAndUpdate(studioId, {
            ratingsAvg: result[0].avgRatings,
            ratingsQuentity: result[0].ratingsQuentity
        })
    } else {
        await Studio.findByIdAndUpdate(studioId, {
            ratingsAvg: 0,
            ratingsQuentity: 0
        })
    }
}

reviewSchema.post('save', async () => {
    await this.calcAvgRatingsAndQuentityRatings(this.studio)
})


reviewSchema.post('remove', async () => {
    await this.calcAvgRatingsAndQuentityRatings(this.studio)
})

module.exports = mongoose.model('Review', reviewSchema);
