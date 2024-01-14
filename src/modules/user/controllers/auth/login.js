const login = require('../../../../common/Auth_operation/login')
const User = require('./../../user.model')


module.exports = login(User)