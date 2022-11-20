const proxyModel = require("../models/proxy");
const settingModel = require("../models/setting");

const index = async (req, res) => {
    let domain = req.headers["host"];
    let proxy = await proxyModel.findOne({domain});
    if (proxy && proxy.type == "keywordrevealer") {
        let setting = await settingModel.findOne();
        let keywordCookie = setting[`${proxy.type}Cookie`];
        let cookies = keywordCookie.split("; ");
        for(cookie of cookies) {
            cookie = cookie.split("=");
            let cookieKey = cookie[0];
            let cookieVal = cookie[1];
            res.cookie(cookieKey, cookieVal, {
                path: "/",
                domain: process.env.NODE_ENV === "development" ? undefined : domain,
                secure: true
            });
        }
    } else if (proxy && proxy.type == "pipiads") {
        let setting = await settingModel.findOne();
        let cookie = setting[`${proxy.type}Cookie`];
        cookie = JSON.parse(cookie);
        res.cookie("uid", cookie.uid, {
            path: "/",
            domain: process.env.NODE_ENV === "development" ? undefined : domain
        });
        res.cookie("PP-userInfo", JSON.stringify(cookie["PP-userInfo"]), {
            path: "/",
            domain: process.env.NODE_ENV === "development" ? undefined : domain
        });
        res.cookie("device_id", cookie.device_id);
    }
    res.status(301).redirect("/");
}

module.exports = {
    index
}