const checkEmail = require('../../../../common/Auth_operation/checkEmail')
const User = require('./../../user.model')


module.exports = checkEmail(User)