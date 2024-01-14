const checkUserDB = async (Model, id) => {
    return Model.findById(id)
}

module.exports = checkUserDB