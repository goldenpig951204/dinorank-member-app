const {
    createProxyMiddleware,
    responseInterceptor
} = require("http-proxy-middleware");
const cheerio = require("cheerio");
const { JSON_to_URLEncoded } = require("../services/utils");
const FormData = require("form-data");

const keywordkegMiddleware = (prefix) => createProxyMiddleware({
    target: `https://app.keywordkeg.com`,
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
        (responseBuffer, proxyRes, req, res) => {
            let domain = `https://${req.headers["host"]}`;
            if (req.url.match(/\.(css|json|js|text|png|jpg|map|ico|svg)/)) {
                return responseBuffer;
            }
            if (
                typeof req.user == "object" && 
                !req.user.isAdmin && (
                    /\/invoices/.test(req.path) || 
                    /\/search\/user-filters/.test(req.path) ||
                    /\/usage\/searches/.test(req.path) ||
                    /\/settings\/profile/.test(req.path) ||
                    /\/settings\/setup/.test(req.path) ||
                    /\/crruent-session/.test(req.path) ||
                    /\/settings\/columns/.test(req.path) 
                ) 
            ) {
                proxyRes.statusCode = 301;
                proxyRes.headers["location"] = domain;
                res.statusCode = 301;
                res.setHeader("location", domain);
            }

            if (proxyRes.headers["location"]) {
                proxyRes.headers["location"] = proxyRes.headers["location"].replace("https://app.keywordkeg.com", domain);
                res.setHeader("location", proxyRes.headers["location"].replace("https://app.keywordkeg.com", domain));
            }
            if (proxyRes.headers["content-type"] && proxyRes.headers["content-type"].includes("text/html")) {
                let response = responseBuffer.toString("utf-8");
                let $ = cheerio.load(response);
                let anchors = $("a");
                anchors.each(function() {
                    let href = $(this).attr("href");
                    if (href !== undefined) {
                        $(this).attr("href", href.replace("https://app.keywordkeg.com", domain));
                    }
                });
                let forms = $("form");
                forms.each(function() {
                    let action = $(this).attr("action");
                    if (action !== undefined) {
                        $(this).attr("action", action.replace("https://app.keywordkeg.com", domain));
                    }
                });
                
                if (typeof req.user == "object" && !req.user.isAdmin) {
                    let menuAnchors = $(".st-dropdown-section[data-dropdown='account'] .col:nth-child(1) a");
                    menuAnchors.each(function() {
                        let href = $(this).attr("href");
                        if (!href.includes("lists") && !href.includes("exports")) {
                            $(this).remove();
                        }
                    });
                    let dropdownItems = $(".st-dropdown-section:nth-child(3) .col:nth-child(1) .dropdown-item");
                    dropdownItems.each(function() {
                        let href = $(this).attr("href");
                        if (/invoice/.test(href) || /search/.test(href) || /usage/.test(href)) {
                            $(this).remove();
                        } 
                    });
                    $(".st-dropdown-section:nth-child(3) .col:nth-child(2)").remove();
                    $(".st-dropdown-section:nth-child(3) .st-dropdown-content-group:nth-child(2)").remove();
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
        referer: "https://app.keywordkeg.com",
        origin: "https://app.keywordkeg.com"
    },
    autoRewrite: true,
    ws: true
});



module.exports = keywordkegMiddleware;