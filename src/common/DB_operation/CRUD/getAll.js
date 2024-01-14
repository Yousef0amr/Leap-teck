const { globalFilter } = require('./../../../utils/filters')

const getAll = (Model, query = {}, filters = globalFilter) => {
    return Model.find(query, { ...filters })
}

module.exports = getAll