const { expressjwt } = require('express-jwt');
const secret = process.env.ACCESS_TOKEN_SECRET
const endpoints = require('./../utils/endPoints')
const User = require('./../modules/user/user.model')
const Chef = require('../modules/chef/validators/chef.model')
const checkUser = require('./../common/DB_operation/checkUserDB')
const wrap = require('express-async-wrapper')


const checkUrl = (req, allowedRoutes) => {
    const matches = allowedRoutes.some(route =>
        req.method === route.method &&
        req.originalUrl.includes(route.url)
    );
    return matches;
};

const userAllowedUrls = [
    { method: 'GET', url: `${endpoints.USER}/current-user` },
    { method: 'PATCH', url: `${endpoints.USER}/current-user` },
    { method: 'DELETE', url: `${endpoints.USER}/current-user` },
    { method: 'GET', url: `${endpoints.USER}/favorites` },
    { method: 'POST', url: `${endpoints.USER}/favorites` },
    { method: 'DELETE', url: `${endpoints.USER}/favorites` },
    { method: 'GET', url: `${endpoints.CATEGORY}` },
    { method: 'POST', url: `${endpoints.CHEF}` },
    { method: 'POST', url: `${endpoints.USER}/change-password` },

]

const chefAllowedUrls = [
    { method: 'GET', url: `${endpoints.CHEF}/current-chef` },
    { method: 'PATCH', url: `${endpoints.CHEF}/current-chef` },
    { method: 'POST', url: `${endpoints.CHEF}/change-password` },
]

const isRevoked = wrap(async (req, token) => {

    const role = token.payload.role;
    const id = token.payload.id;
    req.userId = id
    let isAllowed = false
    switch (role) {
        case 'user':
            isAllowed = checkUrl(req, userAllowedUrls);
            if (isAllowed) {
                const user = await checkUser(User, id)
                if (user) {
                    return false
                }
                return true
            }
            return true
        case 'chef':
            isAllowed = checkUrl(req, chefAllowedUrls);
            if (isAllowed) {
                const chef = await checkUser(Chef, id)
                if (chef) {
                    return false
                }
                return true
            }
            return true
        case 'admin':
            return false;
        default:
            return true;
    }
})

const authRegxOperations = (user) => {
    const allowedUrls = [
        { url: `${user}/login`, method: ["POST", "OPTIONS"] },
        { url: `${user}/register`, method: ["POST", "OPTIONS"] },
        { url: `${user}/check-email`, method: ["POST", "OPTIONS"] },
        { url: `${user}/resend-code`, method: ["POST", "OPTIONS"] },
        { url: `${user}/forget-password`, method: ["POST", "OPTIONS"] },
        { url: `${user}/verify-email`, method: ["POST", "OPTIONS"] },
        { url: `${user}/reset-password`, method: ["POST", "OPTIONS"] },
    ];

    return allowedUrls;
};

const authJwt = wrap(expressjwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked
}).unless(
    {
        path: [
            ...authRegxOperations(endpoints.USER),
            { url: `${endpoints.CHEF}/login`, method: ["POST", "OPTIONS"] },
        ]
    }
))


module.exports = authJwt