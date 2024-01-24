const mongoose = require('mongoose');
const CryptoJS = require("crypto-js");
const setting = require('./../../config/schemaConfig')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    password: {
        type: String,
        required: true
    },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'favoritesModel',
            enum: ['Chef', 'Meal'],
        },
    ],
    favoritesModel: {
        type: String,
        enum: ['Chef', 'Meal'],
    },
    recommendationsMeals: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Category"
        }
    ],
    signWithGoogle: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: "user"
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    }
}, setting);




userSchema.post('find', (data, next) => {
    data.map(user => {
        user.phone = CryptoJS.AES.decrypt(user.phone, process.env.ENCRYPTION_PHONE_KEY).toString(CryptoJS.enc.Utf8)
    })
    next()
})
userSchema.post('findOne', (data, next) => {
    if (data) {
        data.phone = CryptoJS.AES.decrypt(data.phone, process.env.ENCRYPTION_PHONE_KEY).toString(CryptoJS.enc.Utf8)
    }
    next()
})

module.exports = mongoose.model('User', userSchema);








