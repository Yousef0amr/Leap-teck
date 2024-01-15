const mongoose = require('mongoose');
const setting = require('./../../config/schemaConfig')
const serviceSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        unique: true
    }
}, setting)


module.exports = mongoose.model("Service", serviceSchema)