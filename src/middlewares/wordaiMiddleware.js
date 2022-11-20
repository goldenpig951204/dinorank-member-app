const {
    createProxyMiddleware,
    responseInterceptor
} = require("http-proxy-middleware");
const cheerio = require("cheerio");
const { JSON_to_URLEncoded } = require("../services/utils");

const wordaiMiddleware = (prefix) => createProxyMiddleware({
    target: `https://wai.wordai.com`,
    selfHandleResponse: true,
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
        let userAgent = req.headers["user-agent"];
        let { cookie } = req.proxy;
        proxyReq.setHeader("user-agent", userAgent);
        proxyReq.setHeader("cookie", cookie);
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
            if (
                typeof req.user == "object" && 
                !req.user.isAdmin && 
                (/\/update_password/.test(req.path) || /\/api/.test(req.path))
            ) {
                proxyRes.statusCode = 301;
                proxyRes.headers["location"] = domain;
                res.statusCode = 301;
                res.setHeader("location", domain);
            }
            if (proxyRes.headers["location"]) {
                proxyRes.headers["location"] = proxyRes.headers["location"].replace("https://wai.wordai.com", domain);
                res.setHeader("location", proxyRes.headers["location"].replace("https://wai.wordai.com", domain));
            }
            if (
                proxyRes.headers["content-type"] && 
                proxyRes.headers["content-type"].includes("text/html")
            ) {
                let response = responseBuffer.toString("utf-8");
                let $ = cheerio.load(response);
                if (
                    typeof req.user == "object" &&
                    !req.user.isAdmin
                ) {
                    $(".iq-sub-card.iq-bg-primary-hover").remove();
                    $("#sidebar-scrollbar #iq-sidebar-toggle li:nth-child(4)").remove();
                    if (/\/account/.test(req.path)) {
                        $(".iq-edit-profile > li:nth-child(2), .iq-edit-profile > li:nth-child(3)").remove();
                        $(".iq-edit-list-data > .tab-content .tab-pane:nth-child(2), .iq-edit-list-data > .tab-content .tab-pane:nth-child(3)").remove();
                    }
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
        referer: "https://wai.wordai.com",
        origin: "https://wai.wordai.com"
    },
    autoRewrite: true,
    ws: true
});

module.exports = wordaiMiddleware;