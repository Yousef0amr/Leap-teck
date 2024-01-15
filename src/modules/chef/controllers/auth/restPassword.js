const restPassword = require('../../../../common/Auth_operation/restPassword')
const Chef = require('./../../chef.model')

module.exports = restPassword(Chef)