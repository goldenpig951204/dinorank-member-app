const {
    createProxyMiddleware,
    responseInterceptor
} = require("http-proxy-middleware");
const cheerio = require("cheerio");
const { JSON_to_URLEncoded } = require("../services/utils");

const linkcentaurMiddleware = (prefix) => createProxyMiddleware({
    target: `https://www.linkcentaur.com`,
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
                if (typeof req.body.links_form !== "undefined") {
                    req.body.links_form.urls_input_mode = "form";
                }
                writeBody(JSON.stringify(req.body));
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
                proxyRes.headers["location"] = proxyRes.headers["location"].replace("https://www.linkcentaur.com", domain);
                res.setHeader("location", proxyRes.headers["location"].replace("https://www.linkcentaur.com", domain));
            }
            if (typeof req.user == "object" && !req.user.isAdmin && req.path == "/account") {
                proxyRes.statusCode = 301;
                proxyRes.headers["location"] = domain;
                res.statusCode = 301;
                res.setHeader("location", domain);
            }
            if (proxyRes.headers["content-type"] && proxyRes.headers["content-type"].includes("text/html")) {
                let response = responseBuffer.toString("utf-8");
                let $ = cheerio.load(response);
                $("head").append("<script src='/js/linkcentaur.js' type='text/javascript'></script>");
                if (typeof req.user == "object" && !req.user.isAdmin) {  
                    $("#menu li:nth-child(1)").remove();
                }
                if (/^\/campaigns\/\w/.test(req.path)) {
                    $(".links_form_urls_input_mode").remove();
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
        referer: "https://www.linkcentaur.com",
        origin: "https://www.linkcentaur.com"
    },
    autoRewrite: true,
    ws: true
});

module.exports = linkcentaurMiddleware;