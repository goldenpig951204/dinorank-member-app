
const base64 = require("base-64");
const { isValidSess } = require("../services/utils");

const sessionMapper = new Map();

const memberMiddleware = (req, res, next) => {
    if (req.url.match(/\.(css|json|js|text|png|jpg|map|ico|svg)/)) return next();

    let { wpInfo, sess } = req.cookies;
    if (!wpInfo || !sess) return res.status(400).end('Access Denined.');
    
    let userAgent = req.headers['user-agent'];
    let ipAddr = process.env.NODE_ENV == 'development' ? '45.126.3.252' : req.headers['x-forwarded-for'];

    if (!isValidSess(sess, userAgent, ipAddr)) return res.status(400).end('Session is invalid.');
    
    let wpInfoDecoded = JSON.parse(base64.decode(wpInfo));
    if (!wpInfoDecoded.user.accessAble) return res.status(400).end('Membership required.');
    if (!sessionMapper.get(`${wpInfoDecoded.site}-${wpInfoDecoded.user.id}`)) sessionMapper.set(`${wpInfoDecoded.site}-${wpInfoDecoded.user.id}`, sess);
    req.user = wpInfoDecoded.user;
    req.wpSite = wpInfoDecoded.site;
    next();
}

module.exports = memberMiddleware;