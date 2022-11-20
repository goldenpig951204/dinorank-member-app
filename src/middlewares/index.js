const settingModel = require("../models/setting");
const proxyModel = require("../models/proxy");
const domainOverviewModel = require("../models/domainOverview");
const keywordOverviewModel = require("../models/keywordOverview");
const pipiadsOverviewModel = require("../models/pipiadsOverview");

const authMiddleware = require("./authMiddleware");
const memberMiddleware = require("./memberMiddleware");
const jsonMiddleware = require("./jsonMiddleware");

const semrushMiddleware = require("./semrushMiddeware");
const spyfuMiddleware = require("./spyfuMiddleware");
const seolyzeMiddleware = require("./seolyzeMiddleware");
const linkcentaurMiddleware = require("./linkcentaurMiddleware");
const spamzillaMiddleware = require("./spamzillaMiddleware");
const seodityMiddleware = require("./seodityMiddleware");
const rytrmeMiddleware = require("./rytrmeMiddleware");
const sistrixMiddleware = require("./sistrixMiddleware");
const wordaiMiddleware = require("./wordaiMiddleware");
const keywordMiddleware = require("./keywordMiddleware");
const nichescraperMiddleware = require("./nichescraperMiddleware");
const pipiadsMiddleware = require("./pipiadsMiddleware");
const keywordkegMiddleware = require("./keywordkegMiddleware");
const paraphraserMiddleware = require("./paraphraserMiddleware");
const buzzsumoMiddleware = require("./buzzsumoMiddleware");
const articleforgeMiddleware = require("./articleforgeMiddleware");
const bigspyMiddleware = require("./bigspyMiddleware");
const colinkriMiddleware = require("./colinkriMiddleware");
const dinorankMiddleware = require("./dinorankMiddleware");

const notFoundMiddleware = (req, res, next) => {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}

const errorHandleMiddleware = (err, req, res, next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.render("error", { 
        message: err.message,         
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack
    });
}

const nextMiddleware = (req, res, next) => {
    next();
}

const semrushLimitMiddleware = async (req, res) => {
    if (!req.url.match(/\.(css|json|js|text|png|jpg|map|ico|svg)/)) {
        let { id, username, isAdmin } = req.user;
        let { wpSite } = req;
        if (
            !isAdmin && 
            /\/analytics\/overview\//.test(req.originalUrl)
        ) {
            const total = await domainOverviewModel.countRequests(id, username, wpSite, "semrush");
            const limit = await settingModel.getOverviewLimit("semrushDomainOverviewLimit");
            if (total > limit) {
                return {
                    next: false,
                    type: "html",
                    data: `<div class="text-center text-danger">Your daily limit is reached.</div>`
                }              
            }
        } else if (
            !isAdmin &&
            /\/dpa\/rpc/.test(req.originUrl) &&
            typeof req.body == "object" &&
            typeof req.body.params == "object" &&
            req.body.method == "dpa.IsRootDomain" &&
            req.body.params.report == "domain.overview"
        ) {
            await domainOverviewModel.create({
                userId: id,
                username: username,
                site: wpSite,
                proxyType: "semrush",
                domain: req.body.params.args.searchItem
            });
        }
        if (
            !isAdmin &&
            (
                /\/analytics\/keywordoverview\//.test(req.originalUrl) || 
                /\/analytics\/keywordmagic\//.test(req.originalUrl)
            )
        ) {
            const total = await keywordOverviewModel.countRequests(id, username, wpSite, "semrush");
            const limit = await settingModel.getOverviewLimit("semrushKeywordOverviewLimit");
            if (total > limit) {
                return {
                    next: false,
                    type: "html",
                    data: `<div class="text-center text-danger">Your daily limit is reached.</div>`
                }     
            }
        } else if (
            !isAdmin &&
            req.method.toUpperCase() == "POST" &&
            typeof req.body == "object" &&
            (
                (/\/kwogw\/rpc/.test(req.originalUrl) && req.body.method == "fts.GetKeywords") ||
                (/\/kmtgw\/rpc/.test(req.originalUrl) && req.body.method == "fts.GetKeywords")
            ) && req.body.id == 5
        ) {
            await keywordOverviewModel.create({
                userId: id,
                username: username,
                site: wpSite,
                proxyType: "semrush",
                phases: [req.body.params.phrase]
            });
        }
    }
    return {
        next: true
    }
}

const spyfuLimitMiddleware = async (req, res, next) => {
    if (!req.originalUrl.match(/\.(css|json|js|text|png|jpg|map|ico|svg)/)) {
        let { id, username, isAdmin } = req.user;
        let wpSite = req.wpSite;
        if (!isAdmin && (req.path == "/account" || req.path == "/account/subscription")) {
            return {
                next: false,
                redirect: true,
                path: "/"
            }
        }
        if (
            !isAdmin &&
            /\/Endpoints\/Search\/JsonSearch/.test(req.originalUrl) &&
            req.query.isSiteQuery == "true"
        ) {
            const total = await domainOverviewModel.countRequests(id, username, wpSite, "spyfu");
            const limit = await settingModel.getOverviewLimit("spyfuDomainOverviewLimit");
            if (total > limit) {
                return {
                    next: false,
                    redirect: false,
                    data: {
                        IsSerpBacked: false,
                        ResultType: "Domain",
                        ResultTypeId: 0,
                        Searches: 0,
                        WasQueryFound: false    
                    }
                }
            } else {
                await domainOverviewModel.create({
                    userId: id,
                    username: username,
                    site: wpSite,
                    proxyType: "spyfu",
                    domain: req.query.query
                });
            }
        }
        if (
            !isAdmin &&
            /\/Endpoints\/Search\/JsonSearch/.test(req.originalUrl) && 
            req.query.isSiteQuery == "false"
        ) {
            const total = await keywordOverviewModel.countRequests(id, username, wpSite, "spyfu");
            const limit = await settingModel.getOverviewLimit("spyfuKeywordOverviewLimit");
            if (total > limit) {
                return {
                    next: false,
                    redirect: false,
                    data: {
                        IsSerpBacked: false,
                        ResultType: "Term",
                        ResultTypeId: 0,
                        Searches: 0,
                        WasQueryFound: false    
                    }
                }
            } else {
                await keywordOverviewModel.create({
                    userId: id,
                    username: username,
                    site: wpSite,
                    proxyType: "spyfu",
                    phases: [req.query.query]
                });
            }
        }
    }
    return {
        next: true
    }
}

const pipiadsLimitMiddleware = async (req, res, next) => {
    if (!req.originalUrl.match(/\.(css|json|js|text|png|jpg|map|ico|svg)/)) {
        let { id, username, isAdmin } = req.user;
        let wpSite = req.wpSite;
        if (
            !isAdmin &&
            req.method == "POST" &&
            /\/api\/at\/video\/search/.test(req.path)
        ) {
            let total = await pipiadsOverviewModel.countRequests(id, username, wpSite, "pipiads", "advertisement");
            let limit = await settingModel.getOverviewLimit("pipiadsAdvertisementOverviewLimit");
            if (total > limit) {
                return {
                    next: false,
                    data: {
                        message: "Search Time",
                        translate: {
                            title: {
                                zh: "可用次数已用完",
                                en: "The number of available times has been used up"
                            }, 
                            content:{
                                zh: `免费版每天可使用${limit}次，当前次数已用完，立即升级会员版本，获得更多次数`,
                                en: `trial can be used ${limit} times a day, the current times have been used up.`
                            },
                            current_level: "Membership"
                        },
                        code: 403
                    }
                }
            } else {
                await pipiadsOverviewModel.create({
                    userId: id,
                    username: username,
                    site: wpSite,
                    proxyType: "pipiads",
                    type: "advertisement",
                    phases: JSON.stringify(req.body)
                });
            }
        } else if (
            !isAdmin &&
            req.method == "GET" &&
            /\/api\/product/.test(req.path)
        ) {
            let total = await pipiadsOverviewModel.countRequests(id, username, wpSite, "pipiads", "product");
            let limit = await settingModel.getOverviewLimit("pipiadsProductOverviewLimit");
            if (total > limit) {
                return {
                    next: false,
                    data: {
                        message: "Search Time",
                        translate: {
                            title: {
                                zh: "可用次数已用完",
                                en: "The number of available times has been used up"
                            }, 
                            content:{
                                zh: `免费版每天可使用${limit}次，当前次数已用完，立即升级会员版本，获得更多次数`,
                                en: `trial can be used ${limit} times a day, the current times have been used up.`
                            },
                            current_level: "Membership"
                        },
                        code: 403
                    }
                }
            } else {
                await pipiadsOverviewModel.create({
                    userId: id,
                    username: username,
                    site: wpSite,
                    proxyType: "pipiads",
                    type: "product",
                    phases: JSON.stringify(req.query)
                });
            }
        } else if (
            !isAdmin &&
            req.method == "POST" &&
            /\/api\/root_path\/rank\/search/.test(req.path)
        ) {
            let total = await pipiadsOverviewModel.countRequests(id, username, wpSite, "pipiads", "advertiser");
            let limit = await settingModel.getOverviewLimit("pipiadsAdvertiserOverviewLimit");
            if (total > limit) {
                return {
                    next: false,
                    data: {
                        message: "Search Time",
                        translate: {
                            title: {
                                zh: "可用次数已用完",
                                en: "The number of available times has been used up"
                            }, 
                            content:{
                                zh: `免费版每天可使用${limit}次，当前次数已用完，立即升级会员版本，获得更多次数`,
                                en: `trial can be used ${limit} times a day, the current times have been used up.`
                            },
                            current_level: "Membership"
                        },
                        code: 403
                    }
                }
            } else {
                await pipiadsOverviewModel.create({
                    userId: id,
                    username: username,
                    site: wpSite,
                    proxyType: "pipiads",
                    type: "advertiser",
                    phases: JSON.stringify(req.body)
                });
            }
        }
    }
    return {
        next: true
    }
}

const keywordkegLimitMiddleware = async (req, res) => {
    if (req.method == "POST" && req.path == "/sf") {
        let { id, username, isAdmin } = req.user;
        if (isAdmin) {
            let wpSite = req.wpSite;
            let total = await keywordOverviewModel.countRequests(id, username, wpSite, "keywordkeg");
            let limit = await settingModel.getOverviewLimit("keywordkegKeywordOverviewLimit");
            if (total > limit) {
                return {
                    next: false,
                    data: {
                        error: true,
                        handled: true
                    }
                }
            } else {
                await keywordOverviewModel.create({
                    userId: id,
                    username: username,
                    site: wpSite,
                    proxyType: "keywordkeg",
                    phases: [req.keyword]
                });
            }
        }
    }
    return {
        next: true
    }
}

const colinkriLimitMiddleware = async (req, res) => {
    if (
        req.method === "POST" &&
        /\/amember\/crawler\/campaigns\/new/.test(req.path)
    ) {
        let { id, username, isAdmin } = req.user;
        let wpSite = req.wpSite;
        let total = await keywordOverviewModel.countRequests(id, username, wpSite, "colinkri");
        let limit = await settingModel.getOverviewLimit("conlinkriCampaignLimit");
        if (total > limit) {
            return {
                next: false,
                data: {
                    message: `You can only add ${limit} campaigns per day.`
                }
            }
        } else {
            await keywordOverviewModel.create({
                userId: id,
                username: username,
                site: wpSite,
                proxyType: "colinkri",
                phases: [req.body.campaignName]
            });
        }
    }
    return {
        next: true
    }
}

const dinorankLimitMiddleware = async (req, res) => {
    if (req.method === "POST" && /^\/ajax\/densidad.php/.test(req.path)) {
        let { id, username, isAdmin } = req.user;
        if (isAdmin) {
            let wpSite = req.wpSite;
            let total = await keywordOverviewModel.countRequests(id, username, wpSite, "dinorank");
            let limit = await settingModel.getOverviewLimit("dinorankProminenceLimit");
            if (total > limit) {
                return {
                    next: false,
                    data: `<h3 class="alert-danger p-4"><strong>Notice!</strong> Unfortunately, you can only use ${limit} times per day for this feature.</h3>`
                }
            } else {
                await keywordOverviewModel.create({
                    userId: id,
                    username: username,
                    site: wpSite,
                    proxyType: "dinorank",
                    phases: [req.body.keyword]
                });
            }
        }
    }
    return {
        next: true
    }
}

const applyMiddleware = async (req, res, next) => {
    let domain = req.headers["host"];
    let setting = await settingModel.findOne();
    let proxy = await proxyModel.findOne({domain});
    if (proxy !== null) {
        if (setting != null) {
            let prefix = (typeof req.cookies.prefix == "undefined" || req.cookies.prefix == "") ? "www" : req.cookies.prefix;
            req.proxy = {
                prefix,
                cookie: setting[`${proxy.type}Cookie`]
            }
            if (proxy.type == "semrush") {
                let result = await semrushLimitMiddleware(req, res);
                if (result.next) {
                    return semrushMiddleware(req.proxy.prefix)(req, res, next);
                } else {
                    if (result.type == "json") {
                        return res.json(result.data);
                    } else {
                        return res.send(result.data);
                    }
                }
            } else if (proxy.type == "spyfu") {
                let result = await spyfuLimitMiddleware(req, res);
                if (result.next) {
                    return spyfuMiddleware(prefix)(req, res, next);
                } else {
                    if (result.redirect) {
                        return res.status(301).redirect(result.path);
                    } else {
                        return res.json(result.data);
                    }
                }
            } else if (proxy.type == "seolyze") {
                return seolyzeMiddleware(prefix)(req, res, next);
            } else if (proxy.type == "sistrix") {
                sistrixMiddleware(req, res, next);
            } else if (proxy.type == "linkcentaur") {
                return linkcentaurMiddleware(prefix)(req, res, next);
            } else if (proxy.type == "spamzilla") {
                return spamzillaMiddleware(prefix)(req, res, next);
            } else if (proxy.type == "seodity") {
                if (req.proxy.cookie) {
                    res.cookie("jwt-token", req.proxy.cookie, {
                        path: "/",
                        domain: process.env.NODE_ENV === "development" ? undefined : domain
                    });
                }
                return seodityMiddleware(prefix)(req, res, next);
            } else if (proxy.type == "rytrme") {
                return rytrmeMiddleware(prefix)(req, res, next);
            } else if (proxy.type == "wordai") {
                return wordaiMiddleware(prefix)(req, res, next);
            } else if (proxy.type == "keywordrevealer") {
                return keywordMiddleware(req, res, next);
            } else if (proxy.type == "nichescraper") {
                return nichescraperMiddleware(prefix)(req, res, next);
            } else if (proxy.type == "pipiads") {
                let result = await pipiadsLimitMiddleware(req, res);
                if (result.next) {
                    return pipiadsMiddleware(prefix)(req, res, next);
                } else {
                    return res.status(403).json(result.data);
                }
            } else if (proxy.type == "keywordkeg") {
                let result = await keywordkegLimitMiddleware(req, res);
                if (result.next) {
                    return keywordkegMiddleware(prefix)(req, res, next);
                } else {
                    return res.json(result.data);
                }
            } else if (proxy.type == "paraphraser") {
                return paraphraserMiddleware(prefix)(req, res, next);
            } else if (proxy.type == "buzzsumo") {
                return buzzsumoMiddleware(prefix)(req, res, next);
            } else if (proxy.type == "articleforge") {
                return articleforgeMiddleware(prefix)(req, res, next);
            } else if (proxy.type == "bigspy") {
                return bigspyMiddleware(prefix)(req, res, next);
            } else if (proxy.type == "colinkri") {
                let result = await colinkriLimitMiddleware(req, res);
                if (result.next) {
                    return colinkriMiddleware(prefix)(req, res, next);
                } else {
                    return res.render("warning", { msg: result.data.message });
                }
            } else if (proxy.type == "dinorank") {
                let result = await dinorankLimitMiddleware(req, res, next);
                if (result.next) {
                    return dinorankMiddleware(prefix)(req, res, next);
                } else {
                    return res.json(result.data);
                }
            }
        } else {
            return res.render("warning", { msg: "Admin have to set up some proxy-related setting."});
        }
    } else {
        return res.render("warning", {msg: "The domain is not registered in our application."});
    }
}

module.exports = {
    notFoundMiddleware,
    errorHandleMiddleware,
    authMiddleware,
    memberMiddleware,
    jsonMiddleware,
    nextMiddleware,
    spyfuMiddleware,
    applyMiddleware
}