const {
    createProxyMiddleware,
    responseInterceptor
} = require("http-proxy-middleware");
const cheerio = require("cheerio");
const { JSON_to_URLEncoded } = require("../services/utils");

const semrushMiddleware = (prefix) => {
    return createProxyMiddleware({
        target: `https://${prefix}.semrush.com`,
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
            }
        },
        onProxyRes: responseInterceptor(
            (responseBuffer, proxyRes, req, res) => {
                let domain = `https://${req.headers["host"]}`;
                if (req.url.match(/\.(css|json|js|text|png|jpg|map|ico|svg)/)) {
                    return responseBuffer;
                }
                if (proxyRes.headers["location"]) {
                    let locale = "", target = "";
                    try {
                        let url = new URL(proxyRes.headers.location);
                        target = url.origin;
                        locale = url.hostname.split(".")[0];
                    } catch (err) {
                        target = `https://${prefix}.semrush.com`;
                    }

                    if (proxyRes.statusCode == 302) {
                        if (/^(http|https)/.test(proxyRes.headers["location"])) {
                            proxyRes.headers["location"] = `/lang/semrush?prefix=${locale}`;
                            res.setHeader("location", `/lang/semrush?prefix=${locale}`);
                        }
                    } else {
                        proxyRes.headers["location"] = proxyRes.headers["location"].replace(target, domain);
                        res.setHeader("location", proxyRes.headers["location"].replace(target, domain));
                    }
                }
                if (proxyRes.headers["content-type"] && proxyRes.headers["content-type"].includes("text/html")) {
                    let response = responseBuffer.toString("utf-8");
                    let $ = cheerio.load(response);
                    $("head").append("<script src='https://code.jquery.com/jquery-3.6.1.min.js' integrity='sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=' crossorigin='anonymous'></script>");
                    $("head").append("<script src='/js/semrush.js' type='text/javascript'></script>");
                    $(".srf-switch-locale-trigger").remove();
                    $(".srf-header .srf-navbar__right .srf-login-btn, .srf-header .srf-navbar__right .srf-register-btn").remove();
                    if (req.user.isAdmin) {
                        return $.html();
                    } else {
                        if (req.url == "/accounts/profile/account-info" || req.url == "/billing-admin/profile/subscription") {
                            $(".srf-layout__sidebar, .srf-layout__body").remove();
                            $(".srf-layout__footer").before("<h1 style='grid-area: footer; display: block; margin-top: -150px; text-align: center; font-size: 40px; color: #ff642d; font-weight: bold'>You can not access in this page.</h1>");
                          }
                        $(".srf-navbar__right").remove();
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
            referer: `https://${prefix}.semrush.com`,
            origin: `https://${prefix}.semrush.com`
        },
        autoRewrite: true,
        ws: true
    });
}

module.exports = semrushMiddleware;