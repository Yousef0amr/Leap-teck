const mongoose = require('mongoose');
const setting = require('./../../config/schemaConfig')
const CryptoJS = require("crypto-js");


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
        location: {
            type: { type: String, default: 'Point' },
            coordinates: [Number],
        },
        categories: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Category',
                required: true
            }
        ],
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
        },
        healthCertificate: {
            type: String,
            required: true
        },
    },
    ratingsAvg: {
        type: Number,
        default: 0
    },
    ratingsQuentity: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: 'chef'
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
}, setting);


chefSchema.pre(['find', 'findOne'], function (next) {
    this.populate('businessInfo.categories', { createdAt: false });
    next();
});


chefSchema.post('find', (data, next) => {
    data.map(user => {
        user.personalInfo.phone = CryptoJS.AES.decrypt(user.personalInfo.phone, process.env.ENCRYPTION_PHONE_KEY).toString(CryptoJS.enc.Utf8)
    })
    next()
})

chefSchema.post('findOne', (data, next) => {
    if (data) {
        data.personalInfo.phone = CryptoJS.AES.decrypt(data.personalInfo.phone, process.env.ENCRYPTION_PHONE_KEY).toString(CryptoJS.enc.Utf8)
    }
    next()
})

module.exports = mongoose.model('Chef', chefSchema);
