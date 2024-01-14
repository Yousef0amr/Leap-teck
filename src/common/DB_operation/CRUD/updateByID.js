const { globalFilter } = require('../../../utils/filters')

const updateByID = (Model, id, value) => {
    return Model.findByIdAndUpdate(id, { ...value }, { ...globalFilter })
}

module.exports = updateByID