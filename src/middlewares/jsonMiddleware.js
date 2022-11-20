const jsonMiddleware = (req, res, next) => {
    let contentType = req.headers["content-type"];
    if (contentType && contentType.includes("application/json")) {
        req.headers["content-type"] = "application/json; charset=UTF-8";
    }
    next();
}

module.exports = jsonMiddleware;