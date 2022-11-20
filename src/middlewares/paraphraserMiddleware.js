const {
    createProxyMiddleware,
    responseInterceptor
} = require("http-proxy-middleware");
const cheerio = require("cheerio");
const { JSON_to_URLEncoded } = require("../services/utils");
const FormData = require("form-data");


const paraphraserMiddleware = (prefix) => createProxyMiddleware({
    target: `https://www.paraphraser.io`,
    selfHandleResponse: true,
    changeOrigin: true,
    onProxyReq: async (proxyReq, req) => {
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
                proxyReq.setHeader("content-type", "application/x-www-form-urlencoded; charset=UTF-8");
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
            if (typeof req.user == "object" && !req.user.isAdmin && /\/account/.test(req.path)) {
                proxyRes.statusCode = 301;
                proxyRes.headers["location"] = domain;
                res.statusCode = 301;
                res.setHeader("location", domain);
            }
            if (proxyRes.headers["location"]) {
                proxyRes.headers["location"] = proxyRes.headers["location"].replace("https://www.paraphraser.io", domain);
                res.setHeader("location", proxyRes.headers["location"].replace("https://www.paraphraser.io", domain));
            }
            if (proxyRes.headers["content-type"] && proxyRes.headers["content-type"].includes("text/html")) {
                if (
                    /\/frontend\/rewriteArticleBeta/.test(req.path) ||
                    /\/frontend\/rewriteArticleToolBeta/.test(req.path) ||
                    /\/frontend\/checkPlag/.test(req.path) ||
                    /\/frontend\/grammerCheckerBeta/.test(req.path) ||
                    /\/frontend\/summarizerBeta/.test(req.path)
                ) {
                    return responseBuffer;
                }
                let response = responseBuffer.toString("utf-8");
                let $ = cheerio.load(response);
                $("head").append(`<style>.g-recaptcha {display:none}</style>`);
                let anchors = $("a");
                anchors.each(function() {
                    let href = $(this).attr("href");
                    if (href !== undefined) {
                        $(this).attr("href", href.replace("https://www.paraphraser.io", domain));
                    }
                });
                let scripts = $("script");
                scripts.each(function() {
                    let src = $(this).attr("src");
                    if (src == undefined) {
                        let content = $(this).html();
                        let newContent = content.replace(/https:\/\/www.paraphraser.io/g, domain);
                        $(this).html(newContent);
                    } else {
                        $(this).attr("src", src.replace("https://www.paraphraser.io", domain));
                    }
                });
                let langItems = $("#lang_bar li");
                langItems.each(function() {
                    let onClick = $(this).attr("onclick");
                    if (onClick !== undefined) {
                        $(this).attr("onclick", onClick.replace("https://www.paraphraser.io", domain));
                    }
                });
                if (typeof req.user == "object" && !req.user.isAdmin) {
                    $(".home_menu li:nth-child(8)").remove();
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
        referer: "https://www.paraphraser.io",
        origin: "https://www.paraphraser.io"
    },
    autoRewrite: true,
    ws: true
});



module.exports = paraphraserMiddleware;