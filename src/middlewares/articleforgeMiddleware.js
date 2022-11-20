const {
    createProxyMiddleware,
    responseInterceptor
} = require("http-proxy-middleware");
const cheerio = require("cheerio");
const { singleJsonUrlEncoded,JSON_to_URLEncoded } = require("../services/utils");
const FormData = require("form-data");

const articleforgeMiddleware = (prefix) => createProxyMiddleware({
    target: `https://af.articleforge.com`,
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
                let body;
                if (/\/create_article/.test(req.path)) {
                    body = singleJsonUrlEncoded(req.body);
                } else {
                    body = JSON_to_URLEncoded(req.body);
                }
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
            if (typeof req.user == "object" && !req.user.isAdmin && (
                /\/users\/edit/.test(req.path) || /\/billings/.test(req.path) || /\/api_info/.test(req.path)
            )) {
                proxyRes.statusCode = 301;
                proxyRes.headers["location"] = domain + "/home";
                res.statusCode = 301;
                res.setHeader("location", domain + "/home");
            }
            if (proxyRes.headers["location"]) {
                proxyRes.headers["location"] = proxyRes.headers["location"].replace("https://af.articleforge.com", domain);
                res.setHeader("location", proxyRes.headers["location"].replace("https://af.articleforge.com", domain));
            }
            if (proxyRes.headers["content-type"] && proxyRes.headers["content-type"].includes("text/html")) {
                let response = responseBuffer.toString("utf-8");
                let $ = cheerio.load(response);
                let anchors = $("a");
                anchors.each(function() {
                    let href = $(this).attr("href");
                    if (href !== undefined) {
                        $(this).attr("href", href.replace("https://af.articleforge.com", domain));
                    }
                });
                let scripts = $("script");
                scripts.each(function() {
                    let src = $(this).attr("src");
                    if (src == undefined) {
                        let content = $(this).html();
                        let newContent = content.replace(/https:\/\/af.articleforge.com/g, domain);
                        $(this).html(newContent);
                    }
                });
                if (typeof req.user == "object" && !req.user.isAdmin) {
                    $("#iq-sidebar-toggle li:nth-child(6)").remove();
                    $(".iq-user-dropdown .iq-card-body > a").remove();
                }
                $("head").append(`<script>
                    $(document).ready(function() {
                        $("#bulk_import_wp_submit").click(function() {
                            var file = $("#bulk_import_wp_form input[type='file']").val();
                            if (file) {
                                $("#bulk_import_wp_form").submit();
                            }
                        });
                    })
                </script>`)
                return $.html();
            }
            return responseBuffer;
        }
    ),
    prependPath: true,
    secure: false,
    hostRewrite: true,
    headers: {
        referer: "https://af.articleforge.com",
        origin: "https://af.articleforge.com"
    },
    autoRewrite: true,
    ws: true
});



module.exports = articleforgeMiddleware;