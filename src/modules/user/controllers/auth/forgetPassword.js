const forgetPassword = require('../../../../common/Auth_operation/forgetPassword')
const User = require('./../../user.model')


module.exports = forgetPassword(User)