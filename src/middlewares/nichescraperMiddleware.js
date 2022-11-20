const {
    createProxyMiddleware,
    responseInterceptor,
} = require("http-proxy-middleware");
const cheerio = require("cheerio");
const { JSON_to_URLEncoded } = require("../services/utils");
const FormData = require("form-data");


const nichescraperMiddleware = (prefix) => createProxyMiddleware({
    target: `https://nichescraper.com`,
    selfHandleResponse: true,
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
        let userAgent = req.headers["user-agent"];
        proxyReq.setHeader("user-agent", userAgent);
        let { cookie } = req.proxy;
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
                const parts = (req.headers['content-type'] + '').split(/boundary=/);
                const boundary = parts[1];

                const form = new FormData();
                form.setBoundary(boundary);
                for (let name in req.body) {
                    form.append(name, req.body[name]);
                }
                for (let file of req.files) {
                    form.append(file["fieldname"], file.buffer, { filename: file["originalname"] });
                }
                let body = form.getBuffer();
                proxyReq.setHeader("content-type", req.headers["content-type"]);
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
            if (
                typeof req.user == "object" && 
                !req.user.isAdmin && 
                (/\/account/.test(req.path) || 
                /\/change-password.php/.test(req.path) || 
                /\/cancel-confirm.php/.test(req.path) || 
                /\/billing\/receipts/.test(req.path) ||
                /\/logout.php/.test(req.path))
            ) {
                proxyRes.statusCode = 301;
                proxyRes.headers["location"] = domain + "";
                res.statusCode = 301;
                res.setHeader("location", domain + "");
            }
            if (proxyRes.headers["location"]) {
                proxyRes.headers["location"] = proxyRes.headers["location"].replace("https://nichescraper.com", domain);
                res.setHeader("location", proxyRes.headers["location"].replace("https://nichescraper.com", domain));
            }
            if ((typeof req.headers["content-type"] == "undefined" ||
                (req.headers["content-type"] && req.headers["content-type"].includes("text/html"))) &&
                proxyRes.headers["content-type"] && 
                proxyRes.headers["content-type"].includes("text/html")
            ) {
                let response = responseBuffer.toString("utf-8");
                let $ = cheerio.load(response);
                if (typeof req.user == "object" && !req.user.isAdmin) {
                    $("#bs-example-navbar-collapse-1 > ul > li:nth-child(2).dropdown").remove();
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
        referer: "https://nichescraper.com",
        origin: "https://nichescraper.com"
    },
    autoRewrite: true,
    ws: true
});

module.exports = nichescraperMiddleware;