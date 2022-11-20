const {
    createProxyMiddleware,
    responseInterceptor
} = require("http-proxy-middleware");
const cheerio = require("cheerio");
const { JSON_to_URLEncoded } = require("../services/utils");

const pipiadsMiddleware = (prefix) => createProxyMiddleware({
    target: `https://www.pipiads.com`,
    selfHandleResponse: true,
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
        let userAgent = req.headers["user-agent"];
        proxyReq.setHeader("user-agent", userAgent);
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
                req.path == "/" ||
                /\/user-center/.test(req.path) || 
                /\/user-center\/payment/.test(req.path) ||
                /\/user-center\/blocked/.test(req.path) ||
                /\/user-center\/login/.test(req.path)
            ) {
                proxyRes.statusCode = 301;
                proxyRes.headers["location"] = domain + "/ad-search";
                res.statusCode = 301;
                res.setHeader("location", domain + "/ad-search");
            }
            if (proxyRes.headers["location"]) {
                proxyRes.headers["location"] = proxyRes.headers["location"].replace("https://www.pipiads.com", domain);
                res.setHeader("location", proxyRes.headers["location"].replace("https://www.pipiads.com", domain));
            }
            if (
                proxyRes.headers["content-type"] && 
                proxyRes.headers["content-type"].includes("text/html")
            ) {
                let response = responseBuffer.toString("utf-8");
                let $ = cheerio.load(response);
                $("head").append(`<style>
                    .tips-dialog .tipsLimit .dialog-content {
                        padding: 0px !important;
                    }
                    .tipsLimit .dialog-footer {
                        display:none;
                    }
                </style>`);
                if (
                    typeof req.user == "object" &&
                    !req.user.isAdmin
                ) {
                    $("head").append(`<style>.links-box, .links-box + li {
                        display: none !important;
                    }</style>`);
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
        referer: "https://www.pipiads.com",
        origin: "https://www.pipiads.com"
    },
    autoRewrite: true,
    ws: true
});

module.exports = pipiadsMiddleware;