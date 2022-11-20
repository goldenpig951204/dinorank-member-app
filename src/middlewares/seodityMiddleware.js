const {
    createProxyMiddleware,
    responseInterceptor
} = require("http-proxy-middleware");
const cheerio = require("cheerio");
const { JSON_to_URLEncoded } = require("../services/utils");

const seodityMiddleware = (prefix) => createProxyMiddleware({
    target: `https://app.seodity.com`,
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
                typeof req.user == "object" && 
                !req.user.isAdmin && (
                    /\/plan/.test(req.path) ||
                    /\/invoices/.test(req.path) ||
                    /\/settings\/user/.test(req.path)
                )
            ) {
                proxyRes.statusCode = 301;
                proxyRes.headers["location"] = domain;
                res.statusCode = 301;
                res.setHeader("location", domain);
            }
            if (proxyRes.headers["location"]) {
                proxyRes.headers["location"] = proxyRes.headers["location"].replace("https://app.seodity.com", domain);
                res.setHeader("location", proxyRes.headers["location"].replace("https://app.seodity.com", domain));
            }
            if (
                proxyRes.headers["content-type"] && 
                proxyRes.headers["content-type"].includes("text/html")
            ) {
                let response = responseBuffer.toString("utf-8");
                let $ = cheerio.load(response);
                $("head").append(`
                    <style>
                        .sc-cxVPaa.sc-dYtuZ.kCgBgd > :nth-child(3),
                        .sc-cxVPaa.sc-dYtuZ.kCgBgd > :nth-child(3) {
                            display: none;
                        }
                        .sc-jNHqnW.idkeaS {
                            display: none;
                        }
                    </style>`);
                $("head").append(`<script>var user = ${JSON.stringify(req.user)};</script>`);
                $("head").append("<script src='/js/seodity.js' type='text/javascript'></script>");
                return $.html();
            }
            return responseBuffer;
        }
    ),
    prependPath: true,
    secure: false,
    hostRewrite: true,
    headers: {
        referer: "https://app.seodity.com",
        origin: "https://app.seodity.com"
    },
    autoRewrite: true,
    ws: true
});

module.exports = seodityMiddleware;