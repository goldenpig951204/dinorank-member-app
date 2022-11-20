const {
    createProxyMiddleware,
    responseInterceptor
} = require("http-proxy-middleware");
const cheerio = require("cheerio");
const { JSON_to_URLEncoded } = require("../services/utils");

const seolyzeMiddleware = (prefix) => {
    return createProxyMiddleware({
        target: `https://www.seolyze.com`,
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
                    console.log(req.url)
                    return responseBuffer;
                }
                if (req.path == "/") {
                    proxyRes.statusCode = 301;
                    proxyRes.headers["location"] =  `${domain}/EPS-KF/`;
                    res.statusCode = 301;
                    res.setHeader("location", `${domain}/EPS-KF/`);
                }
                if (proxyRes.headers["location"]) {
                    proxyRes.headers["location"] = proxyRes.headers["location"].replace("https://www.seolyze.com", domain);
                    res.setHeader("location", proxyRes.headers["location"].replace("https://www.seolyze.com", domain));
                }
                if (proxyRes.headers["content-type"] && proxyRes.headers["content-type"].includes("text/html")) {
                    let response = responseBuffer.toString("utf-8");
                    response = response.replace(/https:\/\/www.seolyze.com/g, domain);
                    let $ = cheerio.load(response);
                    $("head").append("<script src='https://code.jquery.com/jquery-3.6.1.min.js' integrity='sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=' crossorigin='anonymous'></script>");
                    $("head").append("<script src='/js/seolyze.js' type='text/javascript'></script>");
                    return $.html();
                }
                return responseBuffer;
            }
        ),
        prependPath: true,
        secure: false,
        hostRewrite: true,
        headers: {
            referer: "https://www.seolyze.com",
            origin: "https://www.seolyze.com"
        },
        autoRewrite: true,
        ws: true
    });
}

module.exports = seolyzeMiddleware;