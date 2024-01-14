const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
    personalInfo: {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            match: /^\d{10}$/,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        emailVerfied: {
            type: Boolean,
            default: false
        }
    },
    businessInfo: {
        logo: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        deliveryNumber: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        frontId: {
            type: String,
            required: true
        },
        backId: {
            type: String,
            required: true
        }
    },
    isAccepted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

chefSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

chefSchema.set('toJSON', {
    virtuals: true,
});

const Chef = mongoose.model('Chef', chefSchema);

module.exports = Chef;
