const restPassword = require('../../../../common/Auth_operation/restPassword')
const Admin = require('./../../admin.model')

module.exports = restPassword(Admin)