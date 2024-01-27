const globalFilter = { updatedAt: false, createdAt: false }
const commonFilter = { ...globalFilter, password: false, role: false, isLoggedIn: false, isAccepted: false }
const chefFilter = {
    ...globalFilter, 'personalInfo.password': false, 'businessInfo.frontId': false,
    'businessInfo.backId': false, 'businessInfo.healthCertificate': false,
    role: false, isLoggedIn: false, isAccepted: false
}
const userFilter = { ...commonFilter, favorites: false, _id: false, recommendationsMeals: false }





module.exports = {
    globalFilter,
    chefFilter,
    userFilter
}