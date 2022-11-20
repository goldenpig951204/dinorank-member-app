const {
    createProxyMiddleware,
    responseInterceptor
} = require("http-proxy-middleware");
const cheerio = require("cheerio");
const fs = require("fs");
const {
    JSON_to_URLEncoded,
    spamzillaAutoLogin
} = require("../services/utils");
const credentialModel = require("../models/credential");

const spamzillaMiddleware = (prefix) => createProxyMiddleware({
    target: `https://www.spamzilla.io`,
    selfHandleResponse: true,
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
        let userAgent = req.headers["user-agent"];
        let { cookie } = req.proxy;
        proxyReq.setHeader("user-agent", userAgent);
        proxyReq.setHeader("Cookie", cookie);
        
        if (["POST", "PATCH", "PUT"].includes(req.method)) {
            let contentType = proxyReq.getHeader("content-type");
            const writeBody = (bodyData) => {
                proxyReq.setHeader("content-length", Buffer.byteLength(bodyData));
                proxyReq.write(bodyData);
            }
            
            if (contentType && contentType.includes("application/json")) {
                writeBody(JSON.stringify(req.body));
            }

            if (contentType && contentType.includes("application/x-www-form-urlencoded")) {
                let body = JSON_to_URLEncoded(req.body);
                proxyReq.setHeader("content-type", "application/x-www-form-urlencoded");
                writeBody(body);
            }
            
            if (contentType && contentType.includes("multipart/form-data")) {
                proxyReq.setHeader("content-type", "application/json");
                writeBody(JSON.stringify(req.body));
            }
        }
    },
    onProxyRes: responseInterceptor(
        async (responseBuffer, proxyRes, req, res) => {
            let domain = `https://${req.headers["host"]}`;
            if (req.url.match(/\.(css|json|js|text|png|jpg|map|ico|svg)/)) {
                return responseBuffer;
            }
            
            if (req.path == "/do-auto-login") {
                try {
                    let { username, password } = await credentialModel.findOne({"type": "smapzilla"});
                    let result = await spamzillaAutoLogin(username, password);
                    if (result) {
                        res.statusCode = 200;
                        return JSON.stringify({status: true});
                    } else {
                        res.statisCode = 200;
                        return JSON.stringify({status: false});
                    }
                } catch (err) {
                    res.statusCode = 200;
                    return JSON.stringify({status: false});
                }
            }
            if (proxyRes.headers["location"]) {
                proxyRes.headers["location"] = proxyRes.headers["location"].replace("https://www.spamzilla.io", domain);
                res.setHeader("location", proxyRes.headers["location"].replace("https://www.spamzilla.io", domain));
            }
            if (
                typeof req.user == "object" && 
                !req.user.isAdmin && (
                    /\/account\//.test(req.path) ||
                    /\/settings\//.test(req.path)
                )
            ) {
                proxyRes.statusCode = 301;
                proxyRes.headers["location"] = domain;
                res.statusCode = 301;
                res.setHeader("location", domain);
            }
            if (
                proxyRes.headers["content-type"] && 
                proxyRes.headers["content-type"].includes("text/html")
            ) {
                let response = responseBuffer.toString("utf-8");
                if (/tools\/export\//.test(req.path) || /expired-domains\/export\//.test(req.path)) {
                    return responseBuffer;
                } else if (req.method === "POST" && /\/domains/.test(req.path)) {
                    let content = responseBuffer.toString("utf-8");
                    content = content.replace(/https:\/\/www.spamzilla.io/g, domain);
                    res.statusCode = 200;
                    return content;
                } else {
                    let $ = cheerio.load(response);
                    let anchors = $("a");
                    anchors.each(function() {
                        const href = $(this).attr("href");
                        if (/www.spamzilla.io/.test(href)) {
                            $(this).attr("href", href.replace(/https:\/\/www.spamzilla.io/g, domain));
                        }
                    });
                    
                    $(".free-user").remove();
                    $(".domains-form > p").remove();
                    $(".domains-form .form-group:nth-child(3)").css("display", "none");
                    if (typeof req.user == "object" && !req.user.isAdmin) {  
                        $("a[title='Settings']").parent().remove();
                        $("a[title='Profile']").parent().remove();
                        $("a[title='Logout']").parent().remove();
                    }
                    if (req.path == "/account/login/") {
                        let html = fs.readFileSync(__dirname + "/../views/spamzilla-auth.ejs");
                        return html.toString();
                    } 
                    return $.html();
                }
            }
            return responseBuffer;
        }
    ),
    prependPath: true,
    secure: false,
    hostRewrite: true,
    headers: {
        referer: "https://www.spamzilla.io",
        origin: "https://www.spamzilla.io"
    },
    autoRewrite: true,
    ws: true
});

module.exports = spamzillaMiddleware;