const globalFilter = { updatedAt: false, createdAt: false }
const commonFilter = { ...globalFilter, password: false, role: false, isLoggedIn: false, isAccepted: false, orders: false }
const chefFilter = {}
const userFilter = { ...commonFilter, favorites: false }





module.exports = {
    globalFilter,
    chefFilter,
    userFilter
}