const mongoose = require('mongoose');
const setting = require('../../config/schemaConfig');
const User = require('./../user/user.model')
const Studio = require('./../studio/studio.model')
const wrap = require('express-async-wrapper')
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    studio: {
        type: mongoose.Schema.ObjectId,
        ref: "Studio",
        required: true
    },
    services: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Service",
            required: true
        }
    ],
    status: {
        type: String,
        enum: ['pending', 'in-progerss', 'completed'],
        default: 'pending'
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, setting)


orderSchema.post('save', wrap(
    async (doc) => {
        await User.findByIdAndUpdate(doc.user, { $push: { orders: doc._id } });
        await Studio.findByIdAndUpdate(doc.studio, { $push: { orders: doc._id } });
    }
)
)

orderSchema.post('remove', wrap(
    async (doc) => {
        await User.findByIdAndUpdate(doc.user, { $pull: { orders: doc._id } });

        await Studio.findByIdAndUpdate(doc.studio, { $pull: { orders: doc._id } });
    }
)
)



module.exports = mongoose.model('Order', orderSchema)