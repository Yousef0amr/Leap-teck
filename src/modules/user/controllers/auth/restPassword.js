const restPassword = require('../../../../common/Auth_operation/restPassword')
const User = require('./../../user.model')

module.exports = restPassword(User)