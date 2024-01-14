const { expressjwt } = require('express-jwt');
const secret = process.env.ACCESS_TOKEN_SECRET
const endpoints = require('./../utils/endPoints')
const User = require('./../modules/user/user.model')
const Studio = require('./../modules/studio/studio.model')
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
    { method: 'GET', url: `${endpoints.USER}/favorites` },
    { method: 'POST', url: `${endpoints.USER}/favorites` },
    { method: 'DELETE', url: `${endpoints.USER}/favorites` },
    { method: 'GET', url: `${endpoints.STUDIO}/popular-studios` },
    { method: 'GET', url: `${endpoints.STUDIO}` },
]

const studioAllowedUrls = [
    { method: 'GET', url: `${endpoints.STUDIO}/current-studio` },
    { method: 'PATCH', url: `${endpoints.STUDIO}/current-studio` },
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
        case 'studio':
            isAllowed = checkUrl(req, studioAllowedUrls);
            if (isAllowed) {
                const studio = await checkUser(Studio, id)
                if (studio) {
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
            ...authRegxOperations(endpoints.STUDIO),
            { url: `${endpoints.CAR}`, method: ["GET", 'OPTIONS'] },
            { url: `${endpoints.SERVICE}`, method: ["GET", 'OPTIONS'] },
        ]
    }
))


module.exports = authJwt