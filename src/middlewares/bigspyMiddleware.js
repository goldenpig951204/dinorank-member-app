const {
    createProxyMiddleware,
    responseInterceptor
} = require("http-proxy-middleware");
const cheerio = require("cheerio");
const { JSON_to_URLEncoded } = require("../services/utils");
const FormData = require("form-data");

const bigspyMiddleware = (prefix) => createProxyMiddleware({
    target: `https://bigspy.com`,
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
            if (typeof req.user == "object" && !req.user.isAdmin && /\/setting/.test(req.path)) {
                proxyRes.statusCode = 301;
                proxyRes.headers["location"] = domain;
                res.statusCode = 301;
                res.setHeader("location", domain);
            }
            if (proxyRes.headers["location"]) {
                proxyRes.headers["location"] = proxyRes.headers["location"].replace("https://bigspy.com", domain);
                res.setHeader("location", proxyRes.headers["location"].replace("https://bigspy.com", domain));
            }
            if (proxyRes.headers["content-type"] && proxyRes.headers["content-type"].includes("text/html")) {
                let response = responseBuffer.toString("utf-8");
                let $ = cheerio.load(response);
                let links = $("link");
                links.each(function() {
                    $(this).attr("referrerpolicy", "no-referrer");
                });
                let anchors = $("a");
                anchors.each(function() {
                    let href = $(this).attr("href");
                    if (href !== undefined) {
                        $(this).attr("href", href.replace("https://bigspy.com", domain));
                    }
                });
                let scripts = $("script");
                scripts.each(function() {
                    let src = $(this).attr("src");
                    if (src == undefined) {
                        let content = $(this).html();
                        let newContent = content.replace(/https:\/\/bigspy.com/g, domain);
                        newContent = newContent.replace("t.src='https://cdn.firstpromoter.com/fprom.js',", "t.src='https://cdn.firstpromoter.com/fprom.js', t.referrerpolicy='no-referrer',")
                        $(this).html(newContent);
                    } else {
                        // if (src == "//static-global.zingfront.com/bs/static/js/manifest.356c0578e54bd1231d81.js") {
                        //     $(this).removeAttr("src").removeAttr("referrerpolicy").html(`!function(e){function c(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,c),t.l=!0,t.exports}var n=window.webpackJsonp;window.webpackJsonp=function(r,a,o){for(var f,b,d,i=0,u=[];i<r.length;i++)b=r[i],t[b]&&u.push(t[b][0]),t[b]=0;for(f in a)Object.prototype.hasOwnProperty.call(a,f)&&(e[f]=a[f]);for(n&&n(r,a,o);u.length;)u.shift()();if(o)for(i=0;i<o.length;i++)d=c(c.s=o[i]);return d};var r={},t={32:0};c.e=function(e){function n(){f.onerror=f.onload=null,clearTimeout(b);var c=t[e];0!==c&&(c&&c[1](new Error("Loading chunk "+e+" failed.")),t[e]=void 0)}var r=t[e];if(0===r)return new Promise(function(e){e()});if(r)return r[2];var a=new Promise(function(c,n){r=t[e]=[c,n]});r[2]=a;var o=document.getElementsByTagName("head")[0],f=document.createElement("script");f.type="text/javascript",f.referrerpolicy="no-referrer",f.charset="utf-8",f.async=!0,f.timeout=12e4,c.nc&&f.setAttribute("nonce",c.nc),f.src=c.p+"static/js/"+e+"."+{0:"fe45f7287f03077687b7",1:"111d34dc8d12641974c8",2:"01227fd093cd12a6f7ad",3:"01b61d7058e8f4c6c85d",4:"36be921b7fe20c44a08d",5:"e3b5b464baf757f66ea4",6:"a7117ac12a04b092fd92",7:"fdb852eb0b1658acc03c",8:"514f260551d8b70cd508",9:"e32f36934fb3d93a6c84",10:"c8722c17e0a69684dc62",11:"81110282dc370702ba0b",12:"0ff4feadc08363dbaea6",13:"6be80b5cc56473b47f3a",14:"c8b4b159765e6962cb3e",15:"5023c44529a91f33753b",16:"e7fa7b5d5df996de04e3",17:"23d33e026b420c9b18ab",18:"3f2327d7cbc2be3bfdd7",19:"0586a526452b5fc34f48",20:"1c6d1ee291c35e4dc857",21:"4f8a8b8182bc41714af4",22:"9e5d2823660fcde8207b",23:"6bbb4797aca1d062cc07",24:"5a080ee1b778e7a60bb4",25:"a55eeb1d80328229ca78",26:"a8bf6f18e07509cd7f75",27:"eb7e0fb52713400f553d",28:"62e73d5563b52f04ece7",29:"cd50330f06ece5e6dea4"}[e]+".js";var b=setTimeout(n,12e4);return f.onerror=f.onload=n,o.appendChild(f),a},c.m=e,c.c=r,c.d=function(e,n,r){c.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},c.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(n,"a",n),n},c.o=function(e,c){return Object.prototype.hasOwnProperty.call(e,c)},c.p="//static-global.zingfront.com/bs/",c.oe=function(e){throw console.error(e),e}}([]);`);
                        // } else if (src == "https://zbase-global.zingfront.com/popup/js/popup_tracking_bt.js?v=1596875266") {
                        //     $(this).attr("src", "").html(`var u=getQueryVariable("u");function getQueryVariable(e){for(var r=window.location.search.substring(1).split("&"),t=0;t<r.length;t++){var a=r[t].split("=");if(a[0]==e)return a[1]}return!1}window.trackLayer=window.trackLayer||[],trackLayer={trackingCode:u||"",userId:""},function(e,r,t,a){var i=r.getElementsByTagName(t)[0],n=r.createElement(t);n.async=!0,n.referrerpolicy="no-referrer",n.src="https://zbase-global.zingfront.com/static/js/popup_tracking.js?v="+(new Date).getTime(),i.parentNode.insertBefore(n,i)}(window,document,"script");var t=window.trackLayer;!function(e,r){!function(){var e=this.trackLayer,r=i("_trackUserId"),t=i("_trackCode");""==r?a("_trackUserId",r=""==e.userId?"G-"+Date.parse(new Date):e.userId):""!=e.userId&&e.userId!=r&&a("_trackUserId",r=e.userId);""==t?""!=e.trackingCode&&(t=e.trackingCode,a("_trackCode",e.trackingCode)):""!=e.trackingCode&&e.trackingCode!=t&&a("_trackCode",t=e.trackingCode)}();var t=r.location.pathname;function a(e,t){var a=new Date;a.setTime(a.getTime()+2592e6),document.cookie=e+"="+escape(t)+";expires="+a.toGMTString()+";path=/;",r["cookie"+e]=t}function i(e){var r,t=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(r=document.cookie.match(t))?unescape(r[2]):""}function n(){var e=navigator.userAgent.toLowerCase(),r="ipad"==e.match(/ipad/i),t="iphone os"==e.match(/iphone os/i),a="midp"==e.match(/midp/i),i="rv:1.2.3.4"==e.match(/rv:1.2.3.4/i),n="ucweb"==e.match(/ucweb/i),o="android"==e.match(/android/i),c="windows ce"==e.match(/windows ce/i),d="windows mobile"==e.match(/windows mobile/i);return r||t||a||i||n||o||c||d?"phone":"pc"}!function(){var e,r=i("_trackUserId");if(""==(e=(e=i("_trackCode"))?e:""))return!1;var t=n(),a="/user/popup/reg-event?refcode="+e+"&userId="+(r=r||0)+"&device="+t+"&e=ref_visit";$.get(a,(function(e){}))}(),["/user/login","/user/default/login","/user/register","/user/default/register"].indexOf(t)>-1&&function(){var e,r=i("_trackUserId");if(""==(e=(e=i("_trackCode"))?e:""))return!1;var t=n(),a="/user/popup/reg-event?refcode="+e+"&userId="+(r=r||0)+"&device="+t+"&e=ref_reg";$.get(a,(function(e){}))}()}(0,window);`);
                        // }
                        // $(this).attr("referrerpolicy", "no-referrer");
                    }
                });
                let imgs = $("img");
                imgs.each(function() {
                    $(this).attr("referrerpolicy", "no-referrer");
                });
                let iframeTransfer = $("#iframe-transfer");
                iframeTransfer.each(function() {
                    let iframeTarget = $(this).data("target");
                    let iframeUrl = $(this).data("url");
                    $(this).attr("data-target", iframeTarget.replace("https://bigspy.com", domain));
                    $(this).attr("data-url", iframeUrl.replace("https://bigspy.com", domain));
                });
                
                if (typeof req.user == "object" && !req.user.isAdmin) {
                    $("#saasbox-nav .nav-right > .nav-item:nth-child(2) .nav > .nav-link:nth-child(4)").remove();
                    if (/\/user\/user-info/.test(req.path)) {
                        $("html").append("<style>#pane-profile button {display: none}</style>");
                        $(".popup-user-info-sign el-a").remove();
                        $("#pane-profile button").remove();
                        $(".popup-user-info-sign .user-info-button").remove();
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
        referer: "https://bigspy.com",
        origin: "https://bigspy.com"
    },
    autoRewrite: true,
    ws: true
});



module.exports = bigspyMiddleware;