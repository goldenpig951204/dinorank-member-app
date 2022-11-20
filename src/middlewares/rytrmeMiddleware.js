const {
    createProxyMiddleware,
    responseInterceptor
} = require("http-proxy-middleware");
const cheerio = require("cheerio");
const { JSON_to_URLEncoded } = require("../services/utils");

const rytrmeMiddleware = (prefix) => createProxyMiddleware({
    target: `https://app.rytr.me`,
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
                req.user.isAdmin && /\/account/.test(req.path)
            ) {
                proxyRes.statusCode = 301;
                proxyRes.headers["location"] = domain + "/ryte";
                res.statusCode = 301;
                res.setHeader("location", domain + "/ryte");
            }
            if (proxyRes.headers["location"]) {
                proxyRes.headers["location"] = proxyRes.headers["location"].replace("https://app.rytr.me", domain);
                res.setHeader("location", proxyRes.headers["location"].replace("https://app.rytr.me", domain));
            }
            if (
                proxyRes.headers["content-type"] && 
                proxyRes.headers["content-type"].includes("text/html")
            ) {
                let response = responseBuffer.toString("utf-8");
                let $ = cheerio.load(response);
                if (req.proxy.cookie) {
                    let {token, user} = JSON.parse(req.proxy.cookie);
                    $("head").append(`<style>
                        .style_left__nUNqr > a:nth-child(3) {
                            display: none;
                        }
                    </style>`);

                    $("head").append(`<script>
                        var token = localStorage.getItem("token");
                        if (!token) {
                            window.localStorage.setItem("token", '${token}');
                            window.localStorage.setItem("user", '${JSON.stringify(user)}')
                        }
                        window.onload = function() {
                            document.querySelector(".style_left__nUNqr > a:nth-child(3)").remove();
                        }
                    </script>`);
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
        referer: "https://app.rytr.me",
        origin: "https://app.rytr.me"
    },
    autoRewrite: true,
    ws: true
});

module.exports = rytrmeMiddleware;