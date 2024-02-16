const restPassword = require('../../../../common/Auth_operation/restPassword')
const Chef = require('../../validators/chef.model')

module.exports = restPassword(Chef)