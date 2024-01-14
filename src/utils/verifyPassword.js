const bcrypt = require('bcrypt')

const verifyPassword = async (password, user_password) => {
    return bcrypt.compare(password, user_password);
}


module.exports = verifyPassword