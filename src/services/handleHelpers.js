"use strict";

const cheerio = require("cheerio");
const utils = require("./normalHelpers");
const jsObfuscator = require('javascript-obfuscator');
const btoa = require('btoa');
const fs = require("fs");
const fsPromises = require("fs").promises;
const acorn = require("acorn-loose");
const acornTreeWalk = require("acorn-walk");
const escodegen = require("escodegen");
const path = require("path");




module.exports = new HandlerHelpers();


/**
 * This class contains functions used by proxy Handler classes to perform all the proxy related activities.`
 */
function HandlerHelpers() {}

HandlerHelpers.prototype.MCOP_LOCATION_STR = '__mcopLocation';
HandlerHelpers.prototype.MCOP_COMPOSITE_GET_VAR_NAME = 'mcop-comenc';


/**
 * Returns true if the cf_clearance cookie exists in a string; otherwise it returns false.
 * @param {string} rawCookies a string containing cookies (name and value each separated by a semi colon).
 * @function cloudFlareClearanceCookieExists
 */
HandlerHelpers.prototype.cloudFlareClearanceCookieExists = function (rawCookies) {
    if (typeof rawCookies !== "string")
        return false;
    return /cf_clearance=.+;/.test(rawCookies);
};

/**
 * Returns the new JavaScript code in which location has been replaced with __mcopLocation; otherwise in case nothing was found
 * , the unchanged code is returned. It throws an exception in case an error occurred in the process or **jsCode** is not a string.
 * @param {string} jsCode s string representing JavaScript code.
 * @return string
 * @throws Error
 */
HandlerHelpers.prototype.replaceLocationInJsCode = function (jsCode) {
    const thisHelper = this;

    if (typeof jsCode !== 'string')
        throw new Error('Invalid JavaScript code');

    try {
        let jsCodeTree = thisHelper.parseJsCode(jsCode);
        let newJsCode = this.removeWhitespaceInJsCode(jsCode);
        const codeSnippets = [];
        const replaceCodeSnippet = function(jsCode, replaced, replacement){
            let _jsCode = jsCode;
            const removedTokens = [];
            const PREFIX = 'MCOP_PREFIX_';
            let counter = 1;

            while (true) {
                let start = _jsCode.indexOf(replaced);
                let end = (start === 0) ? start + (replaced.length - 1) : start + (replaced.length);

                if (start === -1)
                    break;
                let endChar = (start === 0) ? _jsCode.charAt(end + 1) : _jsCode.charAt(end);
                let probeStart = (start === 0) ? end + 2 : end + 1;
                if (/[a-z]/i.test(endChar)) {
                    let newToken = replaced + endChar;
                    while (true) {
                        if (!/[a-z]/i.test(_jsCode.charAt(probeStart))) {
                            const aReplacedToken = PREFIX + counter;
                            _jsCode = _jsCode.replace(newToken, aReplacedToken);
                            removedTokens.push({
                                real: newToken,
                                replaced: aReplacedToken
                            });
                            counter++;
                            break;
                        } else {
                            newToken += _jsCode.charAt(probeStart);
                            probeStart++;
                        }
                    }
                    continue;
                }

                if (start === 0) {
                    const endSubtr = _jsCode.substr(end + 1);
                    _jsCode = replacement + endSubtr;
                } else {
                    const startSubtr = _jsCode.substring(0, start);
                    const endSubtr = _jsCode.substr(end);
                    _jsCode = startSubtr + replacement + endSubtr;
                }
            }

            for (let i = 0; i < removedTokens.length; i++) {
                _jsCode = _jsCode.replace(removedTokens[i].replaced, removedTokens[i].real);
            }

            return _jsCode;
        };

        acornTreeWalk.full(jsCodeTree, function (node) {
            let originalSnippet, newSnippet = '';


            if ((node.type === 'Literal' && /location/m.test(node.raw))) {
                const forwardSlashesMatch = (node.raw + '').match(/\//mg) || [];
                const fileExtRegExp = /\.[a-z]+/;
                const space = /\s/;
                const pathWithFileExtension = forwardSlashesMatch.length > 0 && fileExtRegExp.test(node.raw) && ! space.test(node.raw);
                const relativeUrl = forwardSlashesMatch.length > 0 && ! space.test(node.raw);
                if (! (relativeUrl || pathWithFileExtension)) {
                    newSnippet = node.raw.replace(/location/gm, thisHelper.MCOP_LOCATION_STR);
                    newJsCode = newJsCode.replace(node.raw, newSnippet);
                }
            } else if (node.type === 'MemberExpression' && node.property.name === 'location') {
                originalSnippet = thisHelper.toDoubleQuoted(thisHelper.generateCodeFromTree(node) + '');
                node.property.name = thisHelper.MCOP_LOCATION_STR;
                newSnippet = thisHelper.toDoubleQuoted(thisHelper.generateCodeFromTree(node) + '');
                newJsCode = replaceCodeSnippet(newJsCode, originalSnippet, newSnippet);
            } else if (node.type === 'MemberExpression' && node.object.name === 'location') {
                originalSnippet = thisHelper.toDoubleQuoted(thisHelper.generateCodeFromTree(node) + '');
                node.object.name = thisHelper.MCOP_LOCATION_STR;
                newSnippet = thisHelper.toDoubleQuoted(thisHelper.generateCodeFromTree(node) + '');
                newJsCode = replaceCodeSnippet(newJsCode, originalSnippet, newSnippet);
            } else if (node.type === 'Property' && node.key && node.key.type === 'Identifier' && node.key.name === 'location' && node.kind && node.kind === 'init') {
                originalSnippet = thisHelper.toDoubleQuoted(thisHelper.generateCodeFromTree(node) + '');
                node.key.name = thisHelper.MCOP_LOCATION_STR;
                newSnippet = thisHelper.toDoubleQuoted(thisHelper.generateCodeFromTree(node) + '');
                newJsCode = replaceCodeSnippet(newJsCode, originalSnippet, newSnippet);
            } else if (node.type === 'Identifier' && node.name === 'location') {
                originalSnippet = thisHelper.generateCodeFromTree(node) + '';
                newJsCode = thisHelper.replaceLocationIdentifierInJsCode(newJsCode);
            } else if (node.type === 'ObjectPattern') {
                for (let index = 0; index < node.properties.length; index++) {
                    if (node.properties[index].key && node.properties[index].key.type === 'Identifier' && node.properties[index].key.name === 'location') {
                        originalSnippet = thisHelper.toDoubleQuoted(thisHelper.generateCodeFromTree(node) + '');
                        node.properties[index].key.name = thisHelper.MCOP_LOCATION_STR;
                        newSnippet = thisHelper.toDoubleQuoted(thisHelper.generateCodeFromTree(node) + '');
                        newJsCode = replaceCodeSnippet(newJsCode, originalSnippet, newSnippet);
                    }
                }
            }
        });

        newJsCode = newJsCode.replace(/location\s*:/mg, `${thisHelper.MCOP_LOCATION_STR}:`);
        return newJsCode;
    } catch (error) {
        throw error;
    }
};



HandlerHelpers.prototype.toSingleQuoted =  function(str) {
    return (str + "").replace(/"/mg, "'");
};

HandlerHelpers.prototype.toDoubleQuoted =  function(str) {
    return (str + "").replace(/'/mg, '"');
};


HandlerHelpers.prototype.replaceLocationIdentifierInJsCode = function(jsCode) {
    const thisHelper = this;
    const asTree = thisHelper.parseJsCode(jsCode);
    let foundOnce = false;

    acornTreeWalk.full(asTree, function (node, state, type) {
        let originalSnippet, newSnippet = '';
        if (node.type === 'Identifier' && node.name === 'location' && ! foundOnce) {
            foundOnce = true;
            originalSnippet = thisHelper.generateCodeFromTree(node) + '';
            if (node.start === 0) {
                const endSubtr = jsCode.substr(node.end);
                jsCode = thisHelper.MCOP_LOCATION_STR + endSubtr;
            } else {
                const startSubtr = jsCode.substring(0, node.start);
                const endSubtr = jsCode.substr(node.end);
                jsCode = startSubtr + thisHelper.MCOP_LOCATION_STR + endSubtr;
            }
        }
    });

    return jsCode;
};

HandlerHelpers.prototype.replacePostMessageAndLocation = function(jsCode) {
    const asTree = this.parseJsCode(jsCode);
    let newJsCode = jsCode;

    newJsCode = this.replacePostMessage(jsCode, asTree);
    newJsCode = this.replaceLocationInJsCode(jsCode, asTree);

    return newJsCode;
};


/**
 * Replaces location to __mcopLocation in all inline scripts of the given page and returns the new page. In case an error
 * occurred throughout the process it throws an exception.
 * @param htmlPage
 */
HandlerHelpers.prototype.replaceLocationInInlineScripts = function (htmlPage) {
    if (typeof htmlPage !== "string" || htmlPage.length === 0)
        throw new Error("Invalid html document");

    const $ = cheerio.load(htmlPage);
    const scripts = $("script");
    const thisHelper = this;

    scripts.each(function () {
        const currentItem = $(this);
        if (typeof currentItem.attr("src") === "undefined") {
            const newJsCode = thisHelper.replaceLocationInJsCode(currentItem.html());
            currentItem.html(newJsCode);
        }
    });

    return $.html();
};

/**
 * This function replaces the WebSocket(url) constructor calls with WebSocket(mcopModifyUrl(url)) in a Javascript source code and returns the modified version.
 * @param jsCode
 * @return {String}
 */
HandlerHelpers.prototype.replaceWebSocketInJsCode = function (jsCode) {
    /*const codeSnippetRegExp = /WebSocket\([a-zA-Z0-9]+\)/mg;
    const matches = jsCode.match(codeSnippetRegExp);
    if (matches !== null) {
        for (let i = 0; i < matches.length; i++) {
            let codeSnippet = matches[i];
            let url = (codeSnippet + "").replace(/WebSocket\(/, "").replace(/\)/, "");
            const newCodeSnippet = "WebSocket(mcopModifyUrl(" + url + "))";
            jsCode = jsCode.replace(codeSnippetRegExp, newCodeSnippet);
        }
    }*/


    return jsCode;
};


/*HandlerHelpers.prototype.replaceWorkerInJsCode = function (jsCode) {
    return jsCode.replace(/new\sWorker\(/mg, "McopWorker(");
};*/

/**
 * This function modifies arguments of the browser postMessage(message, origin) method into
 * postMessage(_mcopPreparePostMessageMsg(message), _mcopPreparePostMessageOrigin(origin)) and returns the changed JavaScript code.
 * It throws an exception in case the code could not be parsed.
 * @param {string} jsCode a script to parse and modify
 * @param {Object} asTree an object representing the abstract syntax tree of jsCode (generated with acorn). Provide it if you have already parsed the code with acorn.
 * @return {string}
 * @throws {Error}
 */
HandlerHelpers.prototype.replacePostMessage = function (jsCode) {
    //The code is likely a JSON object.
    /*if (/^{/m.test(jsCode) &&  /}$/m.test(jsCode))
        return jsCode;*/

    if (typeof jsCode !== 'string')
        throw new Error('Invalid JavaScript code');

    const thisHelper = this;
    try {
        let newJsCode = this.removeWhitespaceInJsCode(jsCode);
        const __jsCode = this.removeWhitespaceInJsCode(jsCode);
        const jsCodeTree = thisHelper.parseJsCode(jsCode);

        acornTreeWalk.full(jsCodeTree, function (node) {
            //console.log(node)
            if (node.type === "CallExpression") {
                if (typeof node.callee !== "undefined" &&
                    typeof node.callee.property !== "undefined" && node.callee.property.name === "postMessage" && Array.isArray(node["arguments"])) {
                    let arg1Code, arg2Code, arg3Code,newSnippet;

                    let snippet = thisHelper.generateCodeFromTree(node);
                    const snippetSingleQuoted = thisHelper.toSingleQuoted(snippet);
                    const snippetDoubleQuoted = thisHelper.toDoubleQuoted(snippet);
                    let isSingleQuoted = false;
                    let isDoubleQuoted = false;

                    if (__jsCode.includes(snippetSingleQuoted)) {
                        snippet = snippetSingleQuoted;
                        isSingleQuoted = true;
                    } else if (__jsCode.includes(snippetDoubleQuoted)) {
                        snippet = snippetDoubleQuoted;
                        isDoubleQuoted = true;
                    }


                    const calleeCode = thisHelper.generateCodeFromTree(node.callee);
                    switch (node["arguments"].length) {
                        case 1:
                            arg1Code = thisHelper.generateCodeFromTree(node["arguments"][0]);
                            newSnippet = calleeCode + '(_mcopPreparePostMessageMsg(' + arg1Code + '))';
                            if (isSingleQuoted) {
                                newSnippet = thisHelper.toSingleQuoted(newSnippet);
                            } else if (isDoubleQuoted) {
                                newSnippet = thisHelper.toDoubleQuoted(newSnippet);
                            }
                            newJsCode = newJsCode.replace(snippet, newSnippet);
                            break;
                        case 2:
                            arg1Code = thisHelper.generateCodeFromTree(node["arguments"][0]);
                            arg2Code = thisHelper.generateCodeFromTree(node["arguments"][1]);
                            newSnippet = calleeCode + '(_mcopPreparePostMessageMsg(' + arg1Code + '),';
                            newSnippet += '_mcopPreparePostMessageOrigin(' + arg2Code + ')' + ')';
                            if (isSingleQuoted) {
                                newSnippet = thisHelper.toSingleQuoted(newSnippet);
                            } else if (isDoubleQuoted) {
                                newSnippet = thisHelper.toDoubleQuoted(newSnippet);
                            }

                            newJsCode = newJsCode.replace(snippet, newSnippet);
                            break;
                        case 3:
                            arg1Code = thisHelper.generateCodeFromTree(node["arguments"][0]);
                            arg2Code = thisHelper.generateCodeFromTree(node["arguments"][1]);
                            arg3Code = thisHelper.generateCodeFromTree(node["arguments"][2]);
                            newSnippet = calleeCode + '(_mcopPreparePostMessageMsg(' + arg1Code + '),';
                            newSnippet += '_mcopPreparePostMessageOrigin(' + arg2Code + '),' + arg3Code + ')';
                            if (isSingleQuoted) {
                                newSnippet = thisHelper.toSingleQuoted(newSnippet);
                            } else if (isDoubleQuoted) {
                                newSnippet = thisHelper.toDoubleQuoted(newSnippet);
                            }
                            newJsCode = newJsCode.replace(snippet, newSnippet);
                            break;
                    }
                }
            }
        });

        return newJsCode;
    } catch (error) {
        throw error;
    }
};


/**
 * Returns a string corresponding to the textual representation of an abstract syntax tree; otherwise it throws an exception.
 * @param jsCodeTree {Object} an <a hre="https://github.com/estree/estree">ESTree spec</a> object representing an abstract syntax tree of a JavaScript source code.
 * @param options {Object} an object representing the parameters allowed by the generate method of the escodegen js code generator. They are available here:
 * <a href="https://github.com/estools/escodegen/wiki/API">API</a>.
 * @return {string}
 */
HandlerHelpers.prototype.generateCodeFromTree = function(jsCodeTree, options = {format : {compact:true, semicolons: false}, comment: true}){
    //return utf8.decode(escodegen.generate(jsCodeTree, options));
    return escodegen.generate(jsCodeTree, options);
};


/**
 * Returns the abstract syntax tree (as per the ESTree spec) of a JavaScript source code; otherwise it throws an exception.
 * @param jsCode {string} a JavaScript source code.
 * @param options {Object} an object representing parameters supported by the parse method of the acorn JavaScript parser. As defined here
 * <a href="https://github.com/acornjs/acorn/tree/master/acorn">Acorn parse options</a>
 * @return {Object}
 */
HandlerHelpers.prototype.parseJsCode = function(jsCode, options = {ecmaVersion: 2022}){
    return acorn.parse(this.removeWhitespaceInJsCode(jsCode), options);
};

HandlerHelpers.prototype.removeWhitespaceInJsCode = function(jsCode){
    return (jsCode + '').replace(/,\s+/mg, ',').replace(/\s+,/mg, ',');
    //return (jsCode + '').replace(/,\s+|\s+,/mg, ',').replace(/:\s+|\s+:/mg, ':');
};



/**
 * Replaces location to __mcopLocation in all inline scripts of the given page and returns the new page. In case an error
 * occurred throughout the process it throws an exception.
 * @param htmlPage
 */
HandlerHelpers.prototype.replaceLocationInInlineScripts = function (htmlPage) {
    if (typeof htmlPage !== "string" || htmlPage.length === 0)
        throw new Error("Invalid html document");

    const $ = cheerio.load(htmlPage);
    const scripts = $("script");
    const thisHelper = this;

    scripts.each(function () {
        const currentItem = $(this);
        if (typeof currentItem.attr("src") === "undefined") {
            const newJsCode = thisHelper.replaceLocationInJsCode(currentItem.html());
            currentItem.html(newJsCode);
        }
    });

    return $.html();
};

/**
 * Returns a full https url or throws an exception. The returned url is obtained as follows:
 * * in case the Referer header of a HTTP request is not set or it's not a secure https url the returned url is **https://canvaDomain/
 * * in case the Referer header of a HTTP request is like **https://domain/path?originalhost=real-domain** the returned url is changed to
 * **https://real-domain/path**
 * * in case the Referer header of a HTTP request contains the service worker file name (mcop-sw123456789.js) a new url without it is simply returned.
 * @param {string} targetSiteDomain the currently used jungleScout domain used by the proxy server
 * @param {string} serverName the proxy server domain
 * @param {string} rawRefererUrl a referer url to modify
 * @return string
 * @throws Error
 */
HandlerHelpers.prototype.getRealReferer = function (targetSiteDomain, serverName, rawRefererUrl) {
    if (typeof targetSiteDomain !== "string" || targetSiteDomain.length === 0)
        throw new Error("Invalid domain");

    if (typeof serverName !== "string" || serverName.length === 0)
        throw new Error("Invalid server name : " + serverName);

    const urlProtocolsRegExp = /^(https|http|wss|ws):\/\//;
    if (typeof rawRefererUrl !== "string" || rawRefererUrl.length === 0 || ! urlProtocolsRegExp.test(rawRefererUrl))
        throw new Error("Invalid referer url");

    let newRefererUrl = rawRefererUrl;
    const refererURLObjt = new URL(rawRefererUrl);

    if (this.urlContainsOriginalHost(rawRefererUrl)) {
        const relUrl = (rawRefererUrl + '').replace(refererURLObjt.origin, '');
        const realUrl = this.removeOriginalHost(relUrl);
        const realHost = this.extractOriginalHost(relUrl);
        newRefererUrl = `${refererURLObjt.protocol}//${realHost}${realUrl}`;
    } else {
        newRefererUrl = `${refererURLObjt.protocol}//${targetSiteDomain}${refererURLObjt.pathname}${refererURLObjt.search}${refererURLObjt.hash}`;
    }

    return newRefererUrl.replace(/mcop-sw123456789\.js/, "");
};


/**
 * Returns true in case a web page contains CloudFlare security hCaptcha challenge; otherwise it returns false.
 * @param {string} htmlPage a html web page to parse.
 * @return bool
 */
HandlerHelpers.prototype.isHCaptchaPage = function (htmlPage) {
    if (typeof htmlPage !== "string")
        return false;

    function itemIsFound(item) {
        return (item !== null && item.length > 0);
    }

    const $ = cheerio.load(htmlPage);

    const bypassMeta = $("#captcha-bypass");
    const challengeForm = $("#challenge-form");

    return (itemIsFound(bypassMeta) && itemIsFound(challengeForm));
};


/**
 * Injects a base tag in the head of a given html document and returns it. In case an error occurred in the process it throws an exception.
 * @param {string} htmlPage a HTML document.
 * @param {string} hrefUrl a url used to set the base's href property. The href property contains a page's url relative to the proxy server
 * @param {string} mcopHref a url used to set the base's mcopHref property. The mcopHref contains the real url of a page.
 * @return string
 * @throws Error
 */
HandlerHelpers.prototype.injectPageBase = function(htmlPage, hrefUrl, mcopHref) {
    if (typeof htmlPage !== "string" || htmlPage.length === 0)
        throw new Error("Invalid html document");

    if (typeof mcopHref !== "string" || mcopHref.length === 0)
        throw new Error("Invalid mcop href url");

    const $ = cheerio.load(htmlPage);
    const head = $("head");

    if (head.length > 0) {
        if (typeof hrefUrl !== "string" || hrefUrl.length === 0) {
            head.eq(0).prepend('<base mcophref="' + mcopHref + '">');
        } else {
            head.eq(0).prepend('<base href="' + hrefUrl + '" mcophref="' + mcopHref + '">');
        }
    }

    return $.html();
};

HandlerHelpers.prototype.injectPageBaseAsString = function(htmlPage, hrefUrl, mcopHref) {
    if (typeof htmlPage !== "string" || htmlPage.length === 0)
        throw new Error("Invalid html document");

    if (typeof mcopHref !== "string" || mcopHref.length === 0)
        throw new Error("Invalid mcop href url");

    let base = '';

    if (typeof hrefUrl !== "string" || hrefUrl.length === 0) {
        base = `<base mcophref="${mcopHref}">`
    } else {
        base = `<base href="${hrefUrl}" mcophref="${mcopHref}">`
    }

    return (htmlPage + '').replace('<head>', `<head>\n${base}`);
};

/**
 * Injects a script tag (which code is loaded from an external file) in the head of a given html document and returns it. In case an error occurred in the process it throws an exception.
 * @param htmlPage a HTML document.
 * @param {string} src a url which points to an external JavaScript file.
 * @returns string
 * @throws Error
 */
HandlerHelpers.prototype.injectJsScriptInHead = function (htmlPage, src) {
    if (typeof htmlPage !== "string" || htmlPage.length === 0)
        throw new Error("Invalid html document");

    if (typeof src !== "string" || src.length === 0)
        throw new Error("Invalid script src");

    const $ = cheerio.load(htmlPage);
    const head = $("head");
    if (head.length > 0) {
        head.eq(0).prepend('<script type="text/javascript" src="' + src + '"></script>');
    }

    return $.html();
};

HandlerHelpers.prototype.injectJsScriptInHeadAsString = function (htmlPage, src) {
    if (typeof htmlPage !== "string" || htmlPage.length === 0)
        throw new Error("Invalid html document");

    if (typeof src !== "string" || src.length === 0)
        throw new Error("Invalid script src");

    const script = `<script type="text/javascript" src="${src}"></script>`;
    return (htmlPage + '').replace('<head>', `<head>\n${script}`);
};

/**
 * Injects a script tag (which contains scripting statements) in the head of a given html document and returns it. In case an error occurred in the process it throws an exception.
 * @param htmlPage a HTML document.
 * @param {string} jsCode a JavaScript code snippet to inject.
 * @returns string
 * @throws Error
 */
HandlerHelpers.prototype.injectInlineJsScriptInHead = function (htmlPage, jsCode) {
    if (typeof htmlPage !== "string" || htmlPage.length === 0)
        throw new Error("Invalid html document");

    if (typeof jsCode !== "string" || jsCode.length === 0)
        throw new Error("Invalid JavaScript code");

    const $ = cheerio.load(htmlPage);
    const head = $("head");
    if (head.length > 0) {
        head.eq(0).prepend('<script type="text/javascript">' + jsCode + '</script>');
    }

    return $.html();
};


/**
 * Returns true if a url contains the original-host variable; otherwise it returns false.
 * @param {string} url a url to check from.
 * @return boolean
 */
HandlerHelpers.prototype.urlContainsOriginalHost = function (url) {
    if (typeof url !== "string" || url.length === 0)
        return false;

    return /[?&]original-host=[a-z0-9.\-]+/.test(url) || /[?&]original-host%3D[a-z0-9.\-]+/.test(url);
};

/**
 * Returns the value of a variable named original-host contained in a given url. In case the variable is not found it returns the empty string.
 * In case an error occurred it throws an exception.
 * #### Note:
 * it's important to note that the original-host variable is supposed to be the last one.
 * @param {string} url a url to parse.
 * @return string
 * @throws Error
 */
HandlerHelpers.prototype.extractOriginalHost = function (url) {
    if (typeof url !== "string" || url.length === 0)
        throw new Error("Invalid url");

    let fullUrl = decodeURIComponent(url);
    let isRelativeUrl = false;
    let fullURLObjt = null;
    const fullUrlRegExp = /^(http|https|wss|ws):\/\/.+/;

    if (! fullUrlRegExp.test(fullUrl)) {
        isRelativeUrl = true;
        if (/^\//.test(fullUrl)) {
            fullUrl = 'http://fake-domain' + fullUrl;
        } else {
            fullUrl = 'http://fake-domain/' + fullUrl;
        }
    }

    //Url with malformed search part. It has ampersands (&) and no question marks (?)
    if (/&/.test(fullUrl) && ! /\?/.test(fullUrl)) {
        //replace first & by ?
        fullUrl = (fullUrl + "").replace(/&/, '?');
    }

    try {
        fullURLObjt = new URL(fullUrl);
    } catch (e) {
        return url;
    }

    let originalDomain = '';

    fullURLObjt.searchParams.forEach(function (value, key) {
        if (key === 'original-host') {
            originalDomain = value;
        }
    });

    return originalDomain;
};

/**
 * Returns a new version of $url without the original-host variable. url is just returned unchanged if it does not
 * contain the original-host variable. An exception is thrown in case an error occurred anywhere in the process.
 * #### Note:
 * it's important to note that the original-host variable is supposed to be the last one.
 * @param {string} url a url to work on.
 * @return string
 * @throws \Exception
 */
HandlerHelpers.prototype.removeOriginalHost = function (url, serverHost = '', realHost = '') {
    const handlerHelpers = this;
    if (typeof url !== "string" || url.length === 0)
        return url;

    let fullUrl = url;
    let isRelativeUrl = false;
    let fullURLObjt = null;
    const fullUrlRegExp = /^(https|http|wss|ws):\/\/.+/;

    if (! fullUrlRegExp.test(fullUrl)) {
        isRelativeUrl = true;
        if (/^\//.test(fullUrl)) {
            fullUrl = 'http://fake-domain' + fullUrl;
        } else {
            fullUrl = 'http://fake-domain/' + fullUrl;
        }
    }

    //Url with malformed search part. It has ampersands (&) and no question marks (?)
    if (/&/.test(fullUrl) && ! /\?/.test(fullUrl)) {
        //replace first & by ?
        fullUrl = (fullUrl + "").replace(/&/, '?');
    }

    try {
        fullURLObjt = new URL(fullUrl);
    } catch (e) {
        return url;
    }

    let searchPart = '';
    fullURLObjt.searchParams.forEach(function (value, key) {
        const encodeURIComponentWrapper = function (value) {
            if (typeof value !== 'string')
                return value;

            if (/^(https|http|wss|ws):\/\//.test(value) || /\s+/.test(value)) {
                return encodeURIComponent(value);
            }

            return value;
        };

        if (! /original-host/.test(key)) {
            if (searchPart.length === 0) {
                searchPart = '?';
            } else {
                searchPart += '&';
            }

            //param value is a url
            if (fullUrlRegExp.test(value)) {
                //encoded url contains original-host
                if (/original-host/.test(value)) {
                    const subOriginalHost = handlerHelpers.extractOriginalHost(value) + '';

                    let subURL = null;
                    try {
                        subURL = new URL(value);
                        let subSearchPart = '';
                        subURL.searchParams.forEach(function (value, key) {
                            if (! /original-host/.test(key)) {
                                if (subSearchPart.length === 0) {
                                    subSearchPart = `?${key}=${value}`;
                                } else {
                                    subSearchPart += `&${key}=${value}`;
                                }
                            }
                        });
                        const realSubUrl = subURL.protocol + "//" + subOriginalHost + subURL.pathname + subSearchPart;
                        searchPart += key + '=' + encodeURIComponentWrapper(realSubUrl);
                    } catch (e) {
                        searchPart += key + '=' + encodeURIComponentWrapper(value);
                    }
                } else {
                    //url containing its host changed from realHost to serverHost (for proxy purposes)
                    try {
                        const subURL = new URL(value);
                        if (subURL.hostname === serverHost) {
                            const realSubUrl = subURL.protocol + "//" + realHost + subURL.pathname + subURL.search;
                            searchPart += key + '=' + encodeURIComponentWrapper(realSubUrl);
                        } else {
                            searchPart += key + '=' + encodeURIComponentWrapper(value);
                        }
                    } catch (e) {
                        searchPart += key + '=' + encodeURIComponentWrapper(value);
                    }
                }
            } else {
                searchPart += key + '=' + encodeURIComponentWrapper(value);
            }
        }
    });



    if (isRelativeUrl)
        return fullURLObjt.pathname + searchPart;

    return fullURLObjt.origin + fullURLObjt.pathname + searchPart;
};

/**
 * Returns a new version of a url without a given variable. Theurl is just returned unchanged if it does not
 * contain the given variable. An exception is thrown in case an error occurred anywhere in the process.
 * @param {string} url a url to work on.
 * @param {string} varName the GET variable to take off a given URL
 * @return {*}
 */
HandlerHelpers.prototype.removeVarFromUrl = function (url, varName) {
    if (typeof url !== "string" || url.length === 0 || typeof varName !== "string" || varName.length === 0)
        return url;

    try {
        const urlObjt = new URL(url);
        let searchPart = '';
        urlObjt.searchParams.forEach(function (value, key) {
            if (key !== varName) {
                if (searchPart.length === 0) {
                    searchPart = '?';
                } else {
                    searchPart += '&';
                }
                searchPart += key + '=' + encodeURIComponent(value);
            }
        });

        return urlObjt.protocol + '//' + urlObjt.hostname + urlObjt.pathname + searchPart;
    } catch (e) {
        return url;
    }
};


/**
 * Removes the @ char from client side cookies and return a string of cookies ready to be forwarded to a server.
 *#### Note:
 * The @ char is supposed to separate a cookie name from its domain; and all cookies without it are simply ignored.
 * @param {string} rawCookies a string containing cookies to parse.
 * @param {string} targetedDomain the domain for which cookies should be gathered.
 * @return string
 * @throws Error
 */
HandlerHelpers.prototype.getClientSideCookies = function (rawCookies, targetedDomain) {
    if (typeof rawCookies !== "string" || rawCookies.length === 0)
        return "";

    if (typeof targetedDomain !== "string" || targetedDomain.length === 0)
        throw new Error("Invalid domain");

    const cookies = rawCookies.split(";");
    let cookiesFound = "";
    cookies.forEach(function (currentCookie, index, array) {
        const parts = currentCookie.split("=");
        if (parts.length !== 2)
            return;
        const domainRegExp = new RegExp(targetedDomain.replace(/\./g, "\\."));
        const nameParts = parts[0].split("@");
        if (nameParts.length !== 2)
            return;

        if (domainRegExp.test(nameParts[1]) || (nameParts[1] + '').includes(targetedDomain)) {
            const name  = nameParts[0].replace(/\s/g, "");
            if (name.length > 0) {
                cookiesFound += name + "=" + decodeURIComponent(parts[1]) + ";";
            }
        }
    });

    return cookiesFound;
};

/**
 *
 * @param rawCookies
 * @return {Array}
 */
HandlerHelpers.prototype.getAllClientSideCookiesAsArray = function (rawCookies) {
    if (typeof rawCookies !== "string" || rawCookies.length === 0)
        return [];


    const cookies = rawCookies.split(";");
    const cookiesFound = [];

    cookies.forEach(function (currentCookie, index, array) {
        const parts = currentCookie.split("=");
        if (parts.length === 2) {
            const nameParts = parts[0].split("@");
            if (nameParts.length === 2) {
                const name  = nameParts[0].replace(/\s/g, "");
                const domain  = nameParts[1].replace(/\s/g, "");
                if (name.length > 0) {
                    cookiesFound.push(`${name}=${parts[1]}; domain=${domain}; path=/;`);
                }
            } else {
                /*const name  = parts[0];
                const value  = parts[1];
                if (typeof name === "string" && typeof value === "string")
                    cookiesFound.push(`${name}=${value};`);*/
            }
        }
    });

    return cookiesFound;
};


/**
 * This function uses a list of allowed request headers and return them ,with their values, as an object in which each property corresponds to a header name.
 * This helps ensure that only specific headers can be sent to a destination server.
 * @param {{}} requestHeaders an object containing all the headers of a request.
 * @param {[]} supportedNames an array containing the names of supported headers.
 * @param {string} refererUrl a url to override the referer value from the client side.
 * @return {{}}
 */
HandlerHelpers.prototype.getAllowedRequestHeaders = function (requestHeaders, supportedNames, refererUrl) {
    if (! Array.isArray(supportedNames) || supportedNames.length === 0)
        return {};

    let headerRegExpStr = "";
    for (let i = 0; i < supportedNames.length; i++) {
        if (i < (supportedNames.length - 1)) {
            headerRegExpStr += "^" + supportedNames[i] + "$|";
        } else {
            headerRegExpStr += "^" + supportedNames[i] + "$";
        }
    }

    const allowedHeadersRegExp = new RegExp(headerRegExpStr);
    const allowedHeaders = {};

    for (let headerName in requestHeaders) {
        if (allowedHeadersRegExp.test(headerName)) {
            if (/referer/i.test(headerName)) {
                if (typeof refererUrl === "string" && refererUrl.length > 0)
                    allowedHeaders[headerName] = refererUrl;
            } else if (/Sec-Fetch-Mode/i.test(headerName)) {
                allowedHeaders[headerName] = "cors";
            } else {
                allowedHeaders[headerName] = requestHeaders[headerName];
            }
        }
    }
    return allowedHeaders;
};


/**
 * This function returns allowed request headers after excluding some headers from an original list of headers.
 * @param {Object} requestHeaders the original list of headers
 * @param {Array} excludedHeaders the list of headers to exclude
 * @param {Object} someHeadersValue a list of headers which each value will override the original value
 * @return {{}}
 */
HandlerHelpers.prototype.filterRequestHeaders = function (requestHeaders, excludedHeaders, someHeadersValue) {
    let headerRegExpStr = "";

    if (Array.isArray(excludedHeaders)) {
        for (let i = 0; i < excludedHeaders.length; i++) {
            if (i < (excludedHeaders.length - 1)) {
                headerRegExpStr += "^" + excludedHeaders[i] + "$|";
            } else {
                headerRegExpStr += "^" + excludedHeaders[i] + "$";
            }
        }
    }

    const excludedHeadersRegExp = new RegExp(headerRegExpStr, "im");

    const allowedHeaders = {};

    if (requestHeaders !== null && typeof requestHeaders === "object" && typeof requestHeaders.hasOwnProperty === "function") {
        for (let headerName in requestHeaders) {
            if (! excludedHeadersRegExp.test(headerName)) {
                /*if (/Sec-Fetch-Mode/i.test(headerName)) {
                    allowedHeaders[headerName] = "cors";
                } else {
                    allowedHeaders[headerName] = requestHeaders[headerName];
                }*/
                allowedHeaders[headerName] = requestHeaders[headerName];
            }
        }
    }

    if (someHeadersValue !== null && typeof someHeadersValue === "object" && typeof someHeadersValue.hasOwnProperty === "function") {
        for (let headerName in someHeadersValue) {
            if (typeof allowedHeaders[headerName] !== "undefined") {
                allowedHeaders[headerName] = someHeadersValue[headerName];
            }
        }
    }

    return allowedHeaders;
};

/**
 * Return true if a given MIME type is a binary one; otherwise it returns false.
 * #### Note:
 * MIME types starting with image, application (except application/javascript,application/json) and text/csv are considered as binary.
 * @param {string} contentType a MIME type.
 * @return boolean
 */
HandlerHelpers.prototype.isBinary = function (contentType) {
    if (typeof contentType !== "string" || /javascript/i.test(contentType) || /json/i.test(contentType))
        return false;

    return /image|font|audio|video|application|text\/csv/i.test(contentType);
};


/**
 * Return true if a given MIME type is text/html; otherwise it returns false.
 * @param {string} contentType a MIME type.
 * @return boolean
 */
HandlerHelpers.prototype.isHtml = function (contentType) {
    if (typeof contentType !== "string")
        return false;

    return /text\/html/mi.test(contentType);
};

HandlerHelpers.prototype.isHtmlPage = function(content) {
    return typeof content === 'string' && /<html/.test(content);
};

HandlerHelpers.prototype.isJson = function(content) {
    return typeof content === 'string' && /^{.+/m.test(content) && /.+}$/m.test(content);
};

HandlerHelpers.prototype.isXml = function (str) {
    return /^<\?xml/.test(str + '');
};


/**
 * Return true if a given MIME type contains javascript; otherwise it returns false.
 * @param {string} contentType a MIME type.
 * @return bool
 */
HandlerHelpers.prototype.isJsCode = function (contentType) {
    if (typeof contentType !== "string")
        return false;

    return /text\/javascript|application\/javascript|text\/ecmascript|application\/ecmascript/i.test(contentType);
};

/**
 * Returns true if the supplied url corresponds to a any item of the MCO proxy; otherwise it returns false.
 * #### Note:
 * The itmes include:
 * * the **mcop-sw-loader123456789.js** file corresponds to the **mcop-sw-loader-ab$012345.js** file located in the ui/static/js folder
 * * the **mcop-sw123456789.js** file corresponds to the **mcop-sw-ab$012345-old.js** file located in the ui/static/js folder
 * * the **mcop-compos123456789.js** file corresponds to the **mcop-components-ab$012345-old.js** file located in the ui/static/js folder
 * @param {string} url a string representing a url to check from.
 * @return boolean
 */
HandlerHelpers.prototype.isMcoProxyPart = function (url) {
    if (typeof url !== "string" || url.length === 0)
        return false;

    return /mcop-sw-loader123456789\.js|mcop-sw123456789\.js|mcop-compos123456789\.js/i.test(url);
};


HandlerHelpers.prototype.isAbsoluteUrl = function (url) {
    return /^(https|http|wss|ws):\/\//.test(url + '');
};

/**
 * This function replaces the domain in $url with the server name and appends it at the end as the value of the original-host variable.
 * If $url already contains the server name it's returned unchanged. urls without the https scheme are returned unchanged. In case an error
 * occurred an exception is thrown.
 * #### Examples:
 * * https://a-domain/ is rewritten to https://server-name/?original-host=a-domain
 * * https://server-name/ is returned unchanged
 * * http://server-name/ is returned unchanged
 * @param {string} url a string representing a url to modify.
 * @param {string} serverName a string representing a proxy server name.
 * @return string
 * @throws Error
 */
HandlerHelpers.prototype.modifyUrl = function (url, serverName) {
    if (typeof serverName !== "string" || serverName.length === 0)
        throw new Error("Invalid server name");

    if (/^\/\//.test(url)) {
        url = "https:" + url;
    }

    const localhostRegExp = new RegExp("https://" + serverName);
    if (typeof url !== "string" || url.length === 0 || localhostRegExp.test(url) || /data:|blob:|javascript:|^#/.test(url))
        return url;

    let newUrl = url;
    if (/^(https|http|wss):\/\//.test(url)) {
        let urlObjt = new URL(url);

        if (/wss:\/\//.test(url)) {
            newUrl = "wss://" + serverName + urlObjt.pathname + urlObjt.search;
        } else {
            newUrl = "https://" + serverName + urlObjt.pathname + urlObjt.search;
        }

        if (/\?/.test(newUrl)) {
            newUrl += "&original-host=" + urlObjt.hostname + urlObjt.hash;
        } else {
            newUrl += "?original-host=" + urlObjt.hostname + urlObjt.hash;
        }
    } else {
        newUrl = url;
        if (url.charAt(0) === "/") {
            newUrl = "https://" + serverName + url;
        } else {
            newUrl = "https://" + serverName + "/" + url;
        }
    }

    return newUrl;
};

/**
 * Returns true in case cookieName is found in clientSideCookies; otherwise it returns false.
 * #### Note:
 * That cookie indicates that the service worker is loaded and functional on the client side.
 * @param {string} clientSideCookies a string containing cookies sent from the client side.
 * @param {string} cookieName a string containing cookies sent from the client side.
 * @return boolean
 */
HandlerHelpers.prototype.serviceWorkerIsLoaded = function (clientSideCookies, cookieName) {
    if (typeof clientSideCookies !== "string" || typeof cookieName !== "string")
        return false;
    const regExp = new RegExp(cookieName + "=" + ".+;?", "m");
    return regExp.test(clientSideCookies);
};

/**
 * This function replaces the WebSocket(url) constructor calls with WebSocket(mcopModifyUrl(url)) in a Javascript source code and returns the modified version.
 * @param jsCode
 * @return {String}
 */
HandlerHelpers.prototype.replaceWebSocketInJsCode = function (jsCode) {
    /*const codeSnippetRegExp = /WebSocket\([a-zA-Z0-9]+\)/mg;
    const matches = jsCode.match(codeSnippetRegExp);
    if (matches !== null) {
        for (let i = 0; i < matches.length; i++) {
            let codeSnippet = matches[i];
            let url = (codeSnippet + "").replace(/WebSocket\(/, "").replace(/\)/, "");
            const newCodeSnippet = "WebSocket(mcopModifyUrl(" + url + "))";
            jsCode = jsCode.replace(codeSnippetRegExp, newCodeSnippet);
        }
    }*/


    return jsCode;
};


/**
 * This function reads a local JavaScript file and returns its content as a string; otherwise it throws an exception.
 * @param {String} filePath a string representing a file's absolute path.
 * @param {boolean} obfuscated indicates whether to obfuscate the code prior to returning it.
 * @param {String} prependedJsCode a string representing JavaScript code that is prepended to the code found in a file.
 * @return {*}
 */
HandlerHelpers.prototype.getLocalJsFile = async function (filePath, obfuscated = true, prependedJsCode = "") {
    try {
        let jsCode = await utils.readFile(filePath);

        if (typeof prependedJsCode === "string")
            jsCode = prependedJsCode + jsCode;

        if (obfuscated) {
            jsCode = jsObfuscator.obfuscate(jsCode, {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 1,
                numbersToExpressions: true,
                simplify: true,
                shuffleStringArray: true,
                splitStrings: true,
                stringArrayThreshold: 1
            });

            jsCode = 'eval(atob("' + btoa(jsCode) + '"));';
            return '(function(){' + jsCode + '})();';
        }

        return jsCode;
    } catch (error) {
        throw error
    }
};

/**
 * Returns true in case a JavaScript code snippet contains at least a call of the importScripts function; otherwise it returns false.
 * @param jsCode a JavaScript code snippet
 * @return {boolean}
 */
HandlerHelpers.prototype.containsImportScrips = function (jsCode) {
    if (typeof jsCode !== "string")
        return false;

    return /importScripts\(/m.test(jsCode) && (! /window\./.test(jsCode) || ! /document\./.test(jsCode));
};


/**
 * Returns
 * @param serverDomain
 * @return {string}
 */
HandlerHelpers.prototype.injectMcopSwInImportScrips = function (serverHost) {
    return 'importScripts("https://' + serverHost + '/mcop-sw123456789.js"); \n\r';
};

HandlerHelpers.prototype.injectMcopSwComponentsInImportScrips = function (serverDomain) {
    return 'importScripts("https://' + serverDomain + '/mcop-compos123456789.js"); \n\r';
};


/**
 * This helper method writes an uncompressed Buffer to a remote HTTP client; otherwise it throws an exception.
 * @param {string|Buffer} rawBuffer a string or Buffer to write to the underlying stream.
 * @param {Number} statusCode a positive integer representing a HTTP status code.
 * @param {http.ServerResponse} response an HTTP writable stream in which data will be sent to the remote client.
 * @throws {Error}
 */
HandlerHelpers.prototype.serveBinaryRes = function(rawBuffer, statusCode, response) {
    if (! (rawBuffer instanceof Buffer || typeof rawBuffer === "string") )
        throw new Error("Invalid data type. Buffer or string expected");

    try {


        let realBuffer = rawBuffer;
        if (typeof rawBuffer === "string") {
            realBuffer = Buffer.from(rawBuffer);
            response.setHeader('transfer-encoding', "chunked");
        } else if (rawBuffer instanceof Buffer) {
            response.setHeader('content-length', rawBuffer.length);
        }

        response.statusCode = statusCode;
        response.end(realBuffer);
    } catch (error) {
        throw error;
    }
};

/**
 * This helper method writes a compressed Buffer (using the brotli compression method) to a remote HTTP client; otherwise it throws an exception.
 * @param {string|Buffer} data a string or Buffer to write to the underlying stream.
 * @param {Number} statusCode a positive integer representing a HTTP status code.
 * @param {http.ServerResponse} response an HTTP writable stream in which data will be sent to the remote client.
 */
HandlerHelpers.prototype.serveCompressedData = function(data, statusCode, response) {
    const zlib = require("zlib");
    try {
        const compressedData = zlib.brotliCompressSync(data);

        response.statusCode = statusCode;
        response.setHeader('content-encoding', "br");
        response.setHeader('content-length', compressedData.length);
        response.end(compressedData);
    } catch (error) {
        //utils.writeToLog(JSON.stringify(response.headers));
        throw error;
    }
};


HandlerHelpers.prototype.containsPortNumber = function(host) {
    return (typeof host === 'string' && /.+:[0-9]+$/.test(host));
};

HandlerHelpers.prototype.extractPortNumber = function(host) {
    if (typeof host === 'string' && /.+:[0-9]+$/.test(host)) {
        const matches = (host + "").match(/:/g);
        if (Array.isArray(matches) && matches.length === 1) {
            const parts = (host + "").split(/:/);
            return parts[1];
        }
    }

    return '';
};

HandlerHelpers.prototype.stripPortNumber = function(host) {
    if (typeof host === 'string') {
        return (host + "").replace(/:[0-9]+$/, "");
    }

    return host;
};


HandlerHelpers.prototype.getErrorPage = function(title, message) {
    const fullPath = __dirname + '/ui/static/pages/title-msg.html';

    try {
        const htmlPage = fs.readFileSync(fullPath, {
            encoding: "utf8"
        });

        const $ = cheerio.load(htmlPage);
        $("#page-title").text(title);
        $("title").text(title);
        const msgBlock = $("#page-msg");
        msgBlock.addClass('error-block');
        msgBlock.html(message);
        return $.html();
    } catch (error) {
        utils.writeToLog(error);
        let html = '<!doctype html>\n';
        html += '<html lang="en">';
        html += '<head><title>' + title + '</title></head>';
        html += '<body>';
        html += '<h2>' + title + '</h2';
        html += '<div style="padding: 10px; color: rgba(255,0,0,0.71);">' + message + '</div>';
        html += '</body>';
        html += '</html>';
        return html;
    }
};

HandlerHelpers.prototype.getRedirectPage = function(redirectUrl, serviceName) {
    const fullPath = __dirname + '/ui/static/pages/redirect-page.html';
    const title  = 'Redirecting to ' + serviceName;

    try {
        const htmlPage = fs.readFileSync(fullPath, {
            encoding: "utf8"
        });

        const $ = cheerio.load(htmlPage);
        $("#page-title").text(title);
        $("title").text(title);
        $('#redirect-btn').attr('_href', redirectUrl);
        return $.html();
    } catch (error) {
        utils.writeToLog(error);
        let html = '<!doctype html>\n';
        html += '<html lang="en">';
        html += '<head><title>' + title + '</title></head>';
        html += '<body>';
        html += '<h2>' + title + '</h2';
        html += '<div style="padding: 10px; color: #073984;background-color: #cfe2ff;border-color: #bbd6fe;">'
            + msgHtml +
            '</div>';
        html += '</body>';
        html += '</html>';
        return html;
    }
};


/**
 * Returns true if a url contains a variable named **mcop-comenc** (representing the search part of the original url encoded in base 64), otherwise it returns false.
 * @param {string} url a url to check from
 * @return {boolean}
 */
HandlerHelpers.prototype.containsCompositeGetVar = function (url) {
    const regExp = new RegExp('\\?' + this.MCOP_COMPOSITE_GET_VAR_NAME + '=.+', 'i');
    const matchedQuestionMarks = (url + "").match(/\?/);
    return regExp.test(url + '') && ! /&/.test(url + '') && Array.isArray(matchedQuestionMarks) && matchedQuestionMarks.length === 1;
};


HandlerHelpers.prototype.decodeCompositeGetVar = function (url) {
    if (! this.containsCompositeGetVar(url))
        return url;

    try {
        const regExp = new RegExp('\\?' + this.MCOP_COMPOSITE_GET_VAR_NAME + '=.+', 'i');
        const urlParts = (url + '').split('=');
        const decodedSearch = atob(urlParts[1]);
        return (url + '').replace(regExp, '') + decodedSearch;
    } catch (e) {
        return url;
    }
};

HandlerHelpers.prototype.shouldBeDecompressed = function (contentType) {
    return /html|javascript/i.test(contentType + '');
};

HandlerHelpers.prototype.extractFileName = function (relativeUrl) {
    return path.basename((relativeUrl + '').replace(/\?.+/, ''));
};

HandlerHelpers.prototype.staticFileIsCached = function (filename, folder = __dirname) {
    if (typeof filename !== 'string' || filename.length === 0 || typeof folder !== 'string' || folder.length === 0)
        return false;

    const path = `${folder}/cache/${filename}`;
    return fs.existsSync(path);
};

HandlerHelpers.prototype.cacheStaticFile = async function (filename, content, folder = __dirname) {
    if (typeof filename !== 'string' || filename.length === 0 || typeof folder !== 'string' || folder.length === 0)
        return false;
    let error = null;
    const folderPath = `${folder}/cache`;
    const fullPath = `${folderPath}/${filename}`;
    if (! fs.existsSync(folderPath))
        await fsPromises.mkdir(folderPath);

    if (fs.existsSync(fullPath))
        await fsPromises.unlink(fullPath);
    await fsPromises.appendFile(fullPath, content).catch(function (wError) {
        error = wError;
    });

    if (error)
        throw error;
    return true;
};

HandlerHelpers.prototype.staticFileReadableStream = function (filename, folder = __dirname) {
    if (typeof filename !== 'string' || filename.length === 0 || typeof folder !== 'string' || folder.length === 0)
        return '';

    const path = `${folder}/cache/${filename}`;
    return fs.createReadStream(path);
};