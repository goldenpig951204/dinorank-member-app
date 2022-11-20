const {
    createProxyMiddleware,
    responseInterceptor
} = require("http-proxy-middleware");
const fs = require("fs");
const cheerio = require("cheerio");
const { 
    JSON_to_URLEncoded,
    spyfuAutoLogin
} = require("../services/utils");
const credentialModel = require("../models/credential");

const spyfuMiddleware = (prefix) => {
    return createProxyMiddleware({
        target: `https://${prefix}.spyfu.com`,
        selfHandleResponse: true,
        changeOrigin: true,
        onProxyReq: (proxyReq, req) => {
            let userAgent = req.headers["user-agent"];
            let { cookie } = req.proxy;
            proxyReq.removeHeader("sec-ch-ua");
            proxyReq.removeHeader("sec-ch-ua-mobile");
            proxyReq.removeHeader("sec-ch-ua-platform");
            proxyReq.removeHeader("sec-fetch-user");
            proxyReq.removeHeader("upgrade-insecure-requests");
            proxyReq.removeHeader("connection");
            proxyReq.removeHeader("pragma");
            proxyReq.removeHeader("accept-language");
            proxyReq.removeHeader("accept-encoding");
            proxyReq.setHeader("user-agent", userAgent);
            proxyReq.setHeader("Cookie", cookie);
            proxyReq.setHeader("host", `${prefix}.spyfu.com`)
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
                        let { username, password } = await credentialModel.findOne({"type": "spyfu"});
                        console.log(username, password);
                        let result = await spyfuAutoLogin(username, password);
                        console.log(result);
                        if (result) {
                            res.statusCode = 200;
                            return JSON.stringify({ status: true });
                        } else {
                            res.statusCode = 200;
                            return JSON.stringify({ status: false });
                        }
                    } catch (err) {
                        res.statusCode = 200;
                        return JSON.stringify({ status: false });
                    }
                }

                if (proxyRes.headers["location"]) {
                    proxyRes.headers["location"] = proxyRes.headers["location"].replace(`https://${prefix}.spyfu.com`, domain);
                    res.setHeader("location", proxyRes.headers["location"].replace(`https://${prefix}.spyfu.com`, domain));
                }
                if (proxyRes.headers["content-type"] && proxyRes.headers["content-type"].includes("text/html")) {
                    let response = responseBuffer.toString("utf-8");
                    let $ = cheerio.load(response);
                    $("head").append("<script src='https://code.jquery.com/jquery-3.6.1.min.js' integrity='sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=' crossorigin='anonymous'></script>");
                    $("head").append(`<script>var locale = "${prefix}"; var isAdmin = ${req.user.isAdmin ? true : false};</script>`);
                    $("head").append("<script src='/js/spyfu.js' type='text/javascript'></script>");
                    if (req.path == "/") {
                        let html = fs.readFileSync(__dirname + "/../views/spyfu-auth.ejs");
                        return html.toString();
                    } 
                    return $.html();
                }
                return responseBuffer;
            }
        ),
        prependPath: true,
        secure: false,
        hostRewrite: true,
        headers: {
            referer: `https://${prefix}.spyfu.com`,
            origin: `https://${prefix}.spyfu.com`
        },
        autoRewrite: true,
        ws: true
    });
}

module.exports = spyfuMiddleware;