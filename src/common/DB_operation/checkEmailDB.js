const checkEmailDB = (Model, email) => {
    return Model.findOne({ email: email })
}

module.exports = checkEmailDB