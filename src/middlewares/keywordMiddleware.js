const querystring = require("querystring");
const cheerio = require("cheerio");

const utils = require("../services/normalHelpers");
const webClient = require("../services/clientHelpers").create(true);
const handlerHelpers = require("../services/handleHelpers");
const FormData = require("form-data");
const dvAxios = require("devergroup-request").default;
const axios = new dvAxios({
    axiosOpt: {
        timeout: 30000
    }
});

const SERVICE_MAIN_DOMAIN = "www.keywordrevealer.com";
const SERVICE_API_DOMAIN = "api.keywordrevealer.com"
const SERVICE_ROOT_DOMAIN = "keywordrevealer.com";
const internals = {};
let currentDomain = "";
module.exports = async function (request, reply) {
    currentDomain = request.headers["host"];

    let targetedUrl = request.url;
    let targetedHost = SERVICE_MAIN_DOMAIN;
    let portNumber = 443;
    let refererUrl = "";
    if (typeof request.headers["referer"] !== "undefined") {
        refererUrl = handlerHelpers.getRealReferer(targetedHost, currentDomain, request.headers["referer"]);
    }

    if (handlerHelpers.urlContainsOriginalHost(request.url)) {
        targetedUrl = handlerHelpers.removeOriginalHost(request.url);
        targetedHost = handlerHelpers.extractOriginalHost(request.url);
        if (handlerHelpers.containsPortNumber(targetedHost)) {
            portNumber = handlerHelpers.extractPortNumber(targetedHost);
            targetedHost = handlerHelpers.stripPortNumber(targetedHost);
        }
    } else {
        if (handlerHelpers.urlContainsOriginalHost(request.headers["referer"] + "")) {
            targetedHost = handlerHelpers.extractOriginalHost(request.headers["referer"] + "");
        }
    }

    const realFullUrl = "https://" + targetedHost + targetedUrl;
    const requestFullUrl = "https://" + currentDomain + request.url;

    const serviceDomainRegExp = new RegExp(SERVICE_ROOT_DOMAIN.replace(/\./, "\."));

    //we get current user only for non static resources
    if (request.path == "/") {
        reply.header("location", "/keyword-research");
        return reply.status(302).send("Redirecting...");
    }
    if (!utils.isStaticRes(request.url)) {

        if (serviceDomainRegExp.test(targetedHost)) {

            if (typeof request.user !== "object") {
                return reply.send("Please connect");
            } else {
                if (!request.user.isAdmin && internals.isForbiddenUrl(request.url)) {
                    reply.header("location", "/keyword-research");
                    return reply.status(302).send("Redirecting...");
                }
            }
        }
    }

    const excludedHeaders = [
        "cookie", "user-agent", "sec-ch-ua", "sec-ch-ua-mobile", "sec-ch-ua-platform",
        "sec-fetch-user", "upgrade-insecure-requests", "host",
        "connection", "pragma", "accept-language", "accept-encoding"
    ];

    const someHeadersValue = {
        "origin": "https://" + SERVICE_MAIN_DOMAIN,
        "referer": refererUrl
    };

    const allowedRequestHeaders = handlerHelpers.filterRequestHeaders(request.headers, excludedHeaders, someHeadersValue);
    if (typeof request.headers["origin"] !== "undefined") {
        allowedRequestHeaders["origin"] = "https://" + SERVICE_MAIN_DOMAIN;
    }



    allowedRequestHeaders["user-agent"] = utils.randomUserAgent(0);

    allowedRequestHeaders["cookie"] = request.proxy.cookie;
    let requestData = "";
    if (/post|put|patch/i.test(request.method)) {
        if (request.method === 'POST') {
            if (/multipart\/form-data/i.test(request.headers['content-type'])) {
                const parts = (request.headers['content-type'] + '').split(/boundary=/);
                const boundary = parts[1];

                const form = new FormData();
                form.setBoundary(boundary);
                for (let name in request.body) {
                    form.append(name, request.body[name]);
                }

                requestData = form.getBuffer().toString('utf8');
            } else if (/application\/json/i.test(request.headers['content-type'])) {
                requestData = JSON.stringify(request.body);
            } else if (/application\/x-www-form-urlencoded/i.test(request.headers['content-type'])) {
                requestData = querystring.stringify(request.body);
            } else {
                requestData = request.body;
            }
        }
        if (typeof requestData === "string") {
            const domainRegExp = new RegExp(currentDomain, "mg");
            const encodedDomainRegExp = new RegExp(currentDomain, "mg");
            const mcoppRegExp = new RegExp(querystring.escape('__mcopp="1"'), "mg");

            requestData = requestData.replace(domainRegExp, targetedHost).replace(new RegExp(handlerHelpers.MCOP_LOCATION_STR, 'mg'), "location");
            requestData = requestData.replace(domainRegExp, targetedHost);
            requestData = requestData.replace(encodedDomainRegExp, targetedHost);
            requestData = requestData.replace(mcoppRegExp, '');
            allowedRequestHeaders["content-length"] = Buffer.byteLength(requestData);
        }
    }

    let serverRes = undefined;

    const threeMinutes = 180000;
    webClient.setTimeout(threeMinutes);
    webClient.acceptUnverifiedSslCertificates();

    if (typeof portNumber !== "undefined")
        webClient.setPort(portNumber);

    if (/\/keywordrevealer_api/.test(request.path)) {
        try {
            targetedUrl = request.path.replace("/keywordrevealer_api", "/api");
            let query = "";
            Object.keys(request.query).forEach((key, idx) => {
                if (query == "") {
                    query += "?" + key + "=" + request.query[key];
                } else {
                    query += "&" + key + "=" + request.query[key];
                }
            });
            let response = await axios.instance.request({
                method: request.method,
                url: `https://api.keywordrevealer.com${targetedUrl}${query}`,
                data: requestData,
                headers: {
                    "Authorization": "Bearer " + request.headers["authorization"]
                }
            });
            return reply.json(response.data);
        } catch (err) {
            return reply.status(422).json({data: err.toString()});
        }
        
    }
    //Send request to remote server as a client
    await webClient.sendRequest(request.method, targetedHost, targetedUrl, allowedRequestHeaders, requestData).then(function (serverResponse) {
        serverRes = serverResponse;
    });

    let body = "";
    let receivedData = serverRes.body;
    const statusCode = serverRes.statusCode;

    const headersToBlock = [
        "set-cookie", "content-encoding", "access-control-allow-origin", "content-security-policy",
        "transfer-encoding", "content-security-policy-report-only", "x-frame-options"
    ];
    let regExpStr = "";
    const lastIndex = headersToBlock.length - 1;
    for (let i = 0; i < headersToBlock.length; i++) {
        if (i < lastIndex) {
            regExpStr += headersToBlock[i] + "|";
        } else {
            regExpStr += headersToBlock[i];
        }
    }

    const skippedHeaderRegExp = new RegExp(regExpStr);
    for (let name in serverRes.headers) {
        if (! skippedHeaderRegExp.test(name + "")) {
            reply.header(name, serverRes.headers[name]);
        }
    }

    if (typeof serverRes.headers["location"] !== "undefined") {
        let redirectUrl = serverRes.headers["location"];
        if (/^\//.test(redirectUrl)) {
            redirectUrl = `https://${targetedHost}${redirectUrl}`;
        }
        const newLocation = handlerHelpers.modifyUrl(redirectUrl, currentDomain);

        reply.header("location", newLocation);
        reply.status(statusCode);
        return reply.send("Redirection...");
    }

    let isEncoded = false;
    body = Buffer.concat(receivedData);
    if (/\/api\/auth\/session/.test(request.url)) {
        let keywordCookie = serverRes.headers["set-cookie"][0];
        let cookies = keywordCookie.split("; ");
        let segment1s = cookies[0].split("=");
        let segment2s = cookies[2].split("=");
        reply.cookie(segment1s[0], segment1s[1], {
            path: "/",
            domain: process.env.NODE_ENV === "development" ? undefined : currentDomain,
            expires: new Date(segment2s[1]),
            secure: true,
            httpOnly: true,  
            sameSite: "lax"
        });
    }
    if (handlerHelpers.shouldBeDecompressed(serverRes.headers['content-type'])) {
        if (receivedData.length > 0) {
            if (/gzip/i.test(serverRes.headers['content-encoding'] + "")) {
                body = await utils.gunzip(body);
                isEncoded = true;
            } else if (/deflate/i.test(serverRes.headers['content-encoding'] + "")) {
                body = await utils.inflate(body);
                isEncoded = true;
            } else if (/br/i.test(serverRes.headers['content-encoding'] + "")) {
                body = await utils.brotliDecompress(body);
                isEncoded = true;
            }
        }
    } else {
        if (typeof serverRes.headers['content-encoding'] !== 'undefined')
            reply.header('content-encoding', serverRes.headers['content-encoding']);
    }
    if (handlerHelpers.isHtml(serverRes.headers["content-type"])) {
        body = body.toString("utf-8");
        if (body.length > 0) {
            body = handlerHelpers.injectJsScriptInHead(body, `https://${currentDomain}/js/keywordrevealer.js`);
            body = handlerHelpers.injectJsScriptInHead(body, `https://${currentDomain}/js/keywordrevealer_custom.js`);

            body = handlerHelpers.injectPageBase(body, requestFullUrl, realFullUrl);
            const $ = cheerio.load(body);
            if (typeof request.user == "object" && !request.user.isAdmin) {
                $("#primary-search-account-menu > div:nth-child(3) > ul > li:nth-child(1)").remove();
                $("head").append(`<style>
                    #primary-search-account-menu ul > li:nth-child(1), #primary-search-account-menu-mobile ul > li:nth-child(1) {
                        display: none 
                    }
                </style>`);
            }
            body = internals.removeInlineContentSecurityPolicy($);
            body = internals.removeUselessParts($, request, targetedHost);
        }
    } else if (handlerHelpers.isXml(body)) {
        body = await internals.injectScriptInXml(body, request);
        let regx = `https://${targetedHost}`;
        body = body.toString().replace(new RegExp(regx, "g"), `https://${currentDomain}`);
        body = body.replace(new RegExp(`https:\/\/${targetedHost}`), `https:\/\/${currentDomain}`)
        body = Buffer.from(body, "utf-8");
    } 
    reply.header("content-length", Buffer.byteLength(body));
    reply.status(statusCode).send(body);
}

internals.removeInlineContentSecurityPolicy = function($) {
    const metaElms = $("meta");
    metaElms.each(function() {
        if (/Content-Security-Policy/i.test($(this).attr("http-equiv"))) {
            $(this).remove();
        }
    });
    return $.html();
}
internals.removeUselessParts = function($, req, targetedHost) {
    const scripts = $("script");
    const anchors = $("a");
    const forms = $("form");
    const iframes = $("iframe");
    const objects = $("object");
    const clicks = $("[onclick]");
    scripts.each(function() {
        const src = $(this).attr("src");
        const xlinkHref = $(this).attr("xlink:href");
        if (typeof src === "undefined") {
            let jsCode = $(this).html();
            try {
                let regx = `https://${targetedHost}`;
                jsCode = jsCode.replace(new RegExp(regx, "g"), `https://${currentDomain}`);
            } catch (error) {
                utils.writeToLog("Failed to parse code \n" + jsCode);
            }
            $(this).html(jsCode);
        } else {
            if (src == "/_next/static/chunks/pages/keyword-research-3daf4dd1287978ec2a60.js" || src == "/_next/static/chunks/dcaad7f9c2e7d2e2450f222b86103d02665f1573.72b705e7516c1535191d.js") {
                $(this).remove();
            } else {
                $(this).attr("src", handlerHelpers.modifyUrl(src, currentDomain));
            }
        }
        if (typeof xlinkHref !== "undefined") {
            $(this).attr("xlink:href", handlerHelpers.modifyUrl(xlinkHref, currentDomain));
        }
    });
    anchors.each(function() {
        const href = $(this).attr("href");
        $(this).attr("href", handlerHelpers.modifyUrl(href, currentDomain));
    });
    forms.each(function() {
        const action = $(this).attr("action");
        $(this).attr("action", handlerHelpers.modifyUrl(action, currentDomain));
    });
    iframes.each(function() {
        const src = $(this).attr("src");
        $(this).attr("src", handlerHelpers.modifyUrl(src, currentDomain));
    });
    
    objects.each(function() {
        const data = $(this).attr("data");
        $(this).attr("data", handlerHelpers.modifyUrl(data, currentDomain));
    });

    clicks.each(function() {
        let script = $(this).attr("onclick");
        let regx = `https://${targetedHost}`;
        script = script.replace(new RegExp(regx, "g"), `https://${currentDomain}`);
        regx = `https:\\\\/\\\\/${targetedHost}`;
        script = script.replace(new RegExp(regx, "g"), `https:\\/\\/${currentDomain}`);
        $(this).attr("onclick", script);
    });

    return $.html();
}
internals.injectScriptInXml = async function(xmlDoc, req) {
    const localHost = currentDomain;
    const matchesItems = (xmlDoc + '').match(/href=".+"/g);

    if (Array.isArray(matchesItems)) {
        for (let i = 0; i < matchesItems.length; i++) {
            let newUrl = handlerHelpers.modifyUrl((matchesItems[i] + '').replace('href="', '').replace('"', ''), localHost);

            if (/&/.test(newUrl)) {
                const urlObjt = new URL(newUrl);
                newUrl = urlObjt.protocol + '//' + urlObjt.host + urlObjt.pathname + '?' +
                    handlerHelpers.MCOP_COMPOSITE_GET_VAR_NAME + '=' + btoa(urlObjt.search);
            }

            const newHref = 'href="' + newUrl + '"';
            xmlDoc = (xmlDoc + '').replace(matchesItems[i], newHref);
        }
    }

    return xmlDoc;
};

internals.isForbiddenUrl = function(url) {
    return /\/my-account/.test(url) || /\/logout/.test(url)
};