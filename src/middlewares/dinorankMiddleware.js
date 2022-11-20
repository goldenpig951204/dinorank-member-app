const {
    createProxyMiddleware,
    responseInterceptor
} = require("http-proxy-middleware");
const cheerio = require("cheerio");
const { JSON_to_URLEncoded } = require("../services/utils");
const FormData = require("form-data");

const dinorankMiddleware = (prefix) => createProxyMiddleware({
    target: `https://dinorank.com`,
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
            
            if (req.url.match(/\.(css|json|js|text|png|jpg|map|ico|svg)/) || /^\/ajax/.test(req.path)) {
                return responseBuffer;
            }
            if (req.path == "/") {
                proxyRes.statusCode = 301;
                proxyRes.headers["location"] = domain + "/en/homed/";
                res.statusCode = 301;
                res.setHeader("location", domain + "/en/homed/");
            }
            if (typeof req.user == "object" && !req.user.isAdmin) {}
            if (proxyRes.headers["location"]) {
                proxyRes.headers["location"] = proxyRes.headers["location"].replace("https://dinorank.com", domain);
                res.setHeader("location", proxyRes.headers["location"].replace("https://dinorank.com", domain));
            }
            if (proxyRes.headers["content-type"] && proxyRes.headers["content-type"].includes("text/html")) {
                let response = responseBuffer.toString("utf-8");
                let $ = cheerio.load(response);
                let links = $("link");
                links.each(function() {
                    let href = $(this).attr("href");
                    if (href !== undefined) {
                        $(this).attr("href", href.replace("https://dinorank.com", domain));
                    }
                });
                let forms = $("form");
                forms.each(function() {
                    let action = $(this).attr("action");
                    if (action !== undefined) {
                        $(this).attr("action", action.replace("https://dinorank.com", domain));
                    }
                });
                let anchors = $("a");
                anchors.each(function() {
                    let href = $(this).attr("href");
                    if (href !== undefined) {
                        $(this).attr("href", href.replace("https://dinorank.com", domain));
                    }
                });
                let scripts = $("script");
                scripts.each(function() {
                    let src = $(this).attr("src");
                    if (src == undefined) {
                        let content = $(this).html();
                        let newContent = content.replace(/https:\/\/dinorank.com/g, domain);
                        $(this).html(newContent);
                    } else {
                        $(this).attr("src", src.replace("https://dinorank.com", domain));
                    }
                });
                if (typeof req.user == "object" && req.user.isAdmin) {
                   if (/\/usuario/.test(req.path)) {
                        $(".interiorContenedor ul.tabs li:nth-child(2), .interiorContenedor ul.tabs li:nth-child(3)").remove();
                        $("#user-account-info, #user-invoices").remove();
                   }
                }
                let menus = $("#interiorMenu > div");
                menus.each(function() {
                    let onclick = $(this).attr("onclick");
                    if (onclick !== undefined) {
                        $(this).attr("onclick", onclick.replace("https://dinorank.com", domain));
                    }
                });
                return $.html();
            }
            return responseBuffer;
        }
    ),
    prependPath: true,
    secure: false,
    hostRewrite: true,
    headers: {
        referer: "https://dinorank.com",
        origin: "https://dinorank.com"
    },
    autoRewrite: true,
    ws: true
});



module.exports = dinorankMiddleware;