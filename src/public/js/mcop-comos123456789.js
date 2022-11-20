(function () {
    const __Mcop = function (scope) {
        if (! scope)
            throw new Error("Invalid scope.");

        this._cachedRealUrl = null;
        this._relativeUrlsPrefix = null;
        this._broadcastChannel = null;
        this._detailsSaved = false;
        this._realOrigin = null;
        this._realHost = null;
        this._proxyOrigin = scope.location.origin;

        this.utils = {
            mcopInstanceName: '__mcopInst',
            originalPrefix: '__mcopOriginal',
            originalValueOf: '__mcopOriginalValueOf',
            mcopUtilsName: '__mcopUtils',
            mcopp: '__mcopp',
            mcopHrefAttrib: 'mcophref',
            mcoppValue: '1',
            mcopLocationName: '__mcopLocation',
            locationName: 'location',
            aboutBlank: 'about:blank',
            httpPort: '80',
            httpsPort: '443',
            logTypes: {
                LOG: 'log',
                WARN: 'warn',
                ERROR: 'error',
            },
            proxyMethods: {
                PROXY_ALL_FILES: {
                    value: 0,
                    regExp: null
                }, ALL_STATIC_FILES_SKIPPED: {
                    value: 1,
                    regExp: /\.(css|json|png|jpg|map|ico|svg|mp3|mp4|jfproj|etx|pfa|fnt|vlw|woff|fot|ttf|sfd|pfb|vfb|otf|gxf|odttf|woff2|pf2|bf|ttc|chr|bdf|fon)/i
                }, FONT_FILES_NOT_SKIPPED: {
                    value: 2,
                    regExp: /\.(css|json|png|jpg|map|ico|svg|mp3|mp4)/i
                }
            },
            sWorkerFileRelPath: '/mcop-sw123456789.js',
            mcopComposFileRelPath: '/mcop-compos123456789.js',
            mcopRequestSpecialSourceVarname: `__mcop-rssrc`,
            mcopRequestPossileSpecialSources: {
                FROM_IFRAME: 'ifr',
                FROM_WORKER: 'wk',
                FROM_WEBSOCKET: 'ws',
            },
            MCOP_B_CHANNEL: 'MCOP_B_CHANNEL$$$$$0987_bBuio123465321',
            mcopBroadcastChannelActions: {
                GET_IMAGE_REAL_URL: 'GET_IMAGE_REAL_URL',
                SHARE_WINDOW_INFOS: 'SHARE_WINDOW_INFOS',
            },
            generateRandomInt : function (min, max) {
                if (typeof min !== "number" || min <= 0 || /[^0-9]/.test(min + "")) {
                    return 0;
                }

                if (typeof max !== "number" || max <= 0 || /[^0-9]/.test(max + "")) {
                    return 0;
                }

                if (max < min) {
                    return min;
                }

                if (max === min) {
                    return min;
                }
                return Math.floor(Math.random() * (max - min + 1) ) + min;
            },
            ucFirst: function (str) {
                if (typeof str !== 'string' || str.length === 0)
                    return str;
                str = (str + '');
                let newStr = '';
                for (let i = 0; i < str.length; i++) {
                    if (i === 0) {
                        newStr += str.charAt(i).toUpperCase();
                    } else {
                        newStr += str.charAt(i);
                    }
                }

                return newStr;
            },
            hasToString: function(objt){
                return typeof objt === 'object' && ('toString' in objt);
            },
            urlContainsOriginalHost: function (url) {
                if (typeof url !== "string" || url.length === 0)
                    return false;

                return /[?&]original-host=[a-z0-9.\-]+/.test(url);
            },
            extractOriginalHost: function (url) {
                if (typeof url !== "string" || url.length === 0)
                    throw new Error("Invalid url");

                let fullUrl = url;
                let isRelativeUrl = false;
                let fullURL = null;
                const fullUrlRegExp = /^(http|https|ws|wss):\/\/.+/;

                if (! fullUrlRegExp.test(fullUrl)) {
                    isRelativeUrl = true;
                    if (/^\//) {
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
                    fullURL = new URL(fullUrl);
                } catch (e) {
                    return '';
                }

                let originalDomain = '';

                fullURL.searchParams.forEach(function (value, key) {
                    if (key === 'original-host') {
                        originalDomain = value;
                    }
                });

                return originalDomain;
            },
            removeOriginalHostAndGetRelativeUrl: function (url) {
                if (typeof url !== "string" || url.length === 0)
                    return url;

                let fullUrl = url;
                let fullURL = null;
                const fullUrlRegExp = /^(http|https|ws|wss):\/\/.+/;

                if (! fullUrlRegExp.test(fullUrl)) {
                    if (/^\//) {
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
                    fullURL = new URL(fullUrl);
                } catch (e) {
                    return '';
                }

                let searchPart = '';
                fullURL.searchParams.forEach(function (value, key) {
                    if (key !== 'original-host') {
                        if (searchPart.length === 0) {
                            searchPart = '?';
                        } else {
                            searchPart += '&';
                        }

                        //param value is a url
                        if (fullUrlRegExp.test(value)) {
                            //encoded url contains original-host
                            if (/original-host/.test(value)) {
                                let subURL = null;
                                try {
                                    subURL = new URL(value);
                                    let subUrlSearchPart = '';
                                    let realSubUrlDomain = '';

                                    subURL.searchParams.forEach(function (value, key) {
                                        if (key !== 'original-host') {
                                            if (searchPart.length === 0) {
                                                subUrlSearchPart = '?';
                                            } else {
                                                subUrlSearchPart += '&';
                                            }

                                            subUrlSearchPart += key + '=' + encodeURIComponent(value);
                                        } else {
                                            realSubUrlDomain = value;
                                        }
                                    });

                                    const realSubUrl = subURL.protocol + "//" + realSubUrlDomain + subURL.pathname + subUrlSearchPart;
                                    searchPart += key + '=' + encodeURIComponent(realSubUrl);
                                } catch (e) {
                                    searchPart += key + '=' + encodeURIComponent(value);
                                }
                            } else {
                                searchPart += key + '=' + encodeURIComponent(value);
                            }
                        } else {
                            searchPart += key + '=' + encodeURIComponent(value);
                        }
                    }
                });

                return fullURL.pathname + searchPart;
            },
            isBlockedDomain: function(domain) {
                const __domain = domain + "";
                return /connect\.facebook\.net/i.test(__domain) || /analytics\.tiktok\.com/i.test(__domain) ||
                    /static\.hotjar\.com/i.test(__domain) || /script\.hotjar\.com/i.test(__domain) ||
                    /vars\.hotjar\.com/i.test(__domain) || /googlesyndication\.com/i.test(__domain) ||
                    /googleadservices\.com/i.test(__domain) || /adservice\.google\.com/i.test(__domain) ||
                    /doubleclick\.net/i.test(__domain) || /intercom\.io/i.test(__domain) ||
                    /intercomcdn\.com/i.test(__domain) || /nr-data\.net/i.test(__domain) ||
                    /getclicky\.com/i.test(__domain) || /crisp\.chat/i.test(__domain)||
                    /clarity\.ms/i.test(__domain) || /amplitude\.com/i.test(__domain) ||
                    /clouderrorreporting\.googleapis\.com/i.test(__domain) ||
                    /owox\.com/i.test(__domain) || /chatra\.io/i.test(__domain);
            },
            isIFrame: function (elt) {
                return (elt && elt.tagName && elt.tagName.toLowerCase() === 'iframe')
            }
        };

        scope[this.utils.mcopUtilsName] = this.utils;
        this.scope = scope;
        this.sWorkerStatus = null;
    };

    __Mcop.prototype.getRealUrl = function () {
        if (this._cachedRealUrl)
            return this._cachedRealUrl;

        this._realOrigin = this._realHost = null;

        if (this.scope.location.href === this.utils.aboutBlank) {
            return this.utils.aboutBlank;
        }

        let realUrl = this.scope.location.href;
        const baseElt = this.scope['document'].querySelector('base');
        if (baseElt !== null) {
            this.baseElement = baseElt;
            /*if (! /https:\/\//.test(baseElt.getAttribute(this.mcophref)))
                throw new Error('mcophref attribute is missing from the base element.');*/
            const href = baseElt.getAttribute('href');
            const mcophref = baseElt.getAttribute(this.utils.mcopHrefAttrib);

            if (href !== null && href.length > 0 && ! href.startsWith(this.scope.location.origin)) {
                realUrl = href;
            } else {
                realUrl = mcophref;
            }

            this._relativeUrlsPrefix = realUrl;
            //Here we try to build the prefix that will be used to build the real absolute urls of images with relative urls
            //We detect extensions in the current base url
            if (/\..+$/.test(realUrl)) {
                const parts = realUrl.split('/');
                const lastPart = parts[parts.length - 1];
                this._relativeUrlsPrefix = realUrl.replace(`${lastPart}`, '');
            }

            if (! realUrl.startsWith(this.scope.location.origin)) {
                const realURLObjt = new URL(realUrl);
                this._realOrigin = realURLObjt.origin;
                this._realHost = realURLObjt.host;
            }
        } else if (/original-host=/.test(this.scope.location.search)) {
            const parts = this.scope.location.search.split("original-host=");
            const expectedHost = parts[1];
            realUrl = this.scope.location.protocol + "//" + expectedHost + this.scope.location.pathname +
                this.scope.location.search.replace(/[?&]original-host=.+/, "") + this.scope.location.hash;
        }

        this._cachedRealUrl = realUrl;
        return realUrl;
    };

    __Mcop.prototype.getRealHost = function () {
        this.getRealUrl();
        return this._realHost;
    };

    __Mcop.prototype.isAbsoluteUrl = function (url) {
        const _url = (url + '').replace(/\s*/mg, '');
        return /^(https|http|wss|ws):\/\//.test(_url);
    };

    __Mcop.prototype.isBrowserInternalUrl = function (url) {
        return /data:|blob:|javascript:|about:blank|^#/.test(url);
    };

    __Mcop.prototype.shouldBeEncoded = function (value) {
        return /\s|\||\\|&|\?/.test(value + '') || /^(https|http|wss|ws):\/\//.test(value + '');
    };

    __Mcop.prototype.urlContainsSearchPart = function (url) {
        return /[?&]/.test(url + '');
    };

    /**
     *
     * @param {string} oldUrl a url to rewrite
     * @returns {string}
     */
    __Mcop.prototype.modifyUrl = function (oldUrl) {
        if (typeof oldUrl !== 'string')
            return oldUrl;


        if (/data:|blob:|javascript:|about:blank|^#|^\*$/.test(oldUrl) || oldUrl.length === 0) {
            return oldUrl;
        }

        const thisProxy = this;
        let newUrl = oldUrl.replace(/\s*/mg, '');
        const ORIGINAL_HOST = 'original-host';
        const locationUsed = (this.scope.location.href === this.utils.aboutBlank) ? this.scope.top.location : this.scope.location;

        if (! this.isAbsoluteUrl(oldUrl)) {
            if (/^\/\//.test(oldUrl)) {
                newUrl = locationUsed.protocol + oldUrl;
            } else {
                if (/^\//.test(oldUrl)) {
                    newUrl = locationUsed.origin + oldUrl;
                } else {
                    newUrl = locationUsed.origin + '/' + oldUrl;
                }

                const realHost = this.getRealHost();
                if (typeof realHost === 'string' && realHost.length > 0) {
                    if (thisProxy.urlContainsSearchPart(oldUrl)) {
                        newUrl += `&${ORIGINAL_HOST}=${realHost}`;
                    } else {
                        newUrl += `?${ORIGINAL_HOST}=${realHost}`;
                    }
                }

                return newUrl;
            }
        }

        if (oldUrl.startsWith(locationUsed.origin)) {
            return oldUrl;
        }

        let targetedUrlObjt = null;
        try {
            targetedUrlObjt = new URL(newUrl);
        } catch (error) {
            return oldUrl;
        }

        if (locationUsed.hostname === targetedUrlObjt.hostname)
            return oldUrl;

        newUrl = targetedUrlObjt.protocol + "//" + locationUsed.host + targetedUrlObjt.pathname;
        const realHost = targetedUrlObjt.host;
        targetedUrlObjt.searchParams.forEach(function (value, name) {
            if (name !== ORIGINAL_HOST) {
                if (thisProxy.urlContainsSearchPart(newUrl)) {
                    newUrl += `&${name}=`;
                    newUrl += (thisProxy.shouldBeEncoded(value)) ? encodeURIComponent(value) : value;
                } else {
                    newUrl += `?${name}=`;
                    newUrl += (thisProxy.shouldBeEncoded(value)) ? encodeURIComponent(value) : value;
                }
            }
        });

        newUrl += (thisProxy.urlContainsSearchPart(newUrl)) ? `&${ORIGINAL_HOST}=${realHost}` : `?${ORIGINAL_HOST}=${realHost}`;
        if (typeof targetedUrlObjt.hash === 'string')
            newUrl += targetedUrlObjt.hash;

        return newUrl.replace(/null|undefined/, '');
    };

    __Mcop.prototype.activeProxyMethod = function () {
        return this.utils.proxyMethods.PROXY_ALL_FILES;
    };

    __Mcop.prototype.sendPrefixesToSwWorker = function () {
        const thisProxy = this;
        if (this._broadcastChannel) {
            if (! thisProxy._detailsSaved) {
                this._broadcastChannel.postMessage({
                    action: thisProxy.utils.mcopBroadcastChannelActions.SHARE_WINDOW_INFOS,
                    pageCurrentPrefix: thisProxy._relativeUrlsPrefix,
                    pageRealPrefix: thisProxy.scope[thisProxy.utils.mcopLocationName].origin + '/'
                });
            }
        } else {
            this._broadcastChannel = new BroadcastChannel(this.utils.MCOP_B_CHANNEL);
            this._broadcastChannel.addEventListener('message', function (event) {
                if (event.data.saved && typeof event.data.pageCurrentPrefix === thisProxy._relativeUrlsPrefix) {
                    thisProxy._detailsSaved = true;
                }
            });

            this._broadcastChannel.postMessage({
                action: thisProxy.utils.mcopBroadcastChannelActions.SHARE_WINDOW_INFOS,
                pageCurrentPrefix: thisProxy._relativeUrlsPrefix,
                pageRealPrefix: thisProxy.scope[thisProxy.utils.mcopLocationName].origin + '/'
            });
        }
    };

    __Mcop.prototype.isTopWindow = function () {
        return (this.scope.parent === this.scope);
    };

    __Mcop.prototype.printMsg = function (msg, type = 'log') {
        const beginning = '[MCOP]--> ';
        if (this.scope.console[type]) {
            if (typeof msg === 'string') {
                this.scope.console[type](beginning + msg);
            } else {
                this.scope.console[type](beginning);
                this.scope.console[type](msg);
            }
        } else {
            this.scope.console.log(beginning + msg);
            if (typeof msg === 'string') {
                this.scope.console.log(beginning + msg);
            } else {
                this.scope.console.log(beginning);
                this.scope.console.log(msg);
            }
        }
    };

    __Mcop.prototype.installServiceWorker = function () {
        if (typeof this.scope.navigator === 'undefined')
            return;

        const thisProxy = this;
        const errorMsg = "Oops! Failed to install Mcop service worker.";
        const errorStyle = 'color: #be0000;background-color: #f8d7da;border-color: #f5c6cb;' +
            'margin-left: auto;margin-right: auto;width: 70%; padding: 20px;font-size: 1.6rem;text-align: center;';

        //check that the service worker is active; as soon as it's no more trigger an event and quit.
        if ('serviceWorker' in this.scope.navigator) {
            const location = (thisProxy.scope.top) ? thisProxy.scope.top.location : thisProxy.scope.location;
            const scriptUrl = location.origin + this.utils.sWorkerFileRelPath;
            const checkInterval = setInterval(function () {
                try {
                    thisProxy.scope.navigator.serviceWorker.getRegistration(scriptUrl).then(function (registration) {
                        if (typeof registration === "undefined") {
                            thisProxy.scope.navigator.serviceWorker.register(scriptUrl).then(function (registration) {
                                thisProxy.sendPrefixesToSwWorker();
                            }).catch(function (error) {
                                if (thisProxy.scope.document && thisProxy.scope.document.body) {
                                    thisProxy.scope.document.body.innerHTML = '<div style="' + errorStyle + '">' + errorMsg + '</div>';
                                }
                                clearInterval(checkInterval);
                            });
                        } else {
                            thisProxy.sendPrefixesToSwWorker();
                        }
                    }).catch(function (error) {
                        thisProxy.printMsg(`Failed with error --> ${error}`);
                        if (thisProxy.scope.document && thisProxy.scope.document.body) {
                            thisProxy.scope.document.body.innerHTML = '<div style="' + errorStyle + '">' + errorMsg + '</div>';
                        }
                        clearInterval(checkInterval);
                    });
                } catch (error) {
                    if (thisProxy.scope.document && thisProxy.scope.document.body) {
                        thisProxy.scope.document.body.innerHTML = '<div style="' + errorStyle + '">' + errorMsg + '</div>';
                    }
                    clearInterval(checkInterval);
                }
            }, 0);
        }
    };

    __Mcop.prototype.inWindowScope = function () {
        return (('document' in this.scope) && ('Window' in this.scope));
    };

    __Mcop.prototype.modifyProperty = function (objtToModify, propName, getFunct, setFunct){
        if (typeof objtToModify !== "object")
            throw new Error("Invalid object to modify");

        if (typeof propName !== "string" || propName.length === 0)
            throw new Error("Invalid property name");

        if (! propName in objtToModify)
            throw new Error("the property " + propName + ' does not exist in ' + objtToModify.constructor.name);

        const descriptor = Object.getOwnPropertyDescriptor(objtToModify, propName);

        if (! descriptor || ! descriptor.configurable)
            throw new Error("the property " + propName + ' of object ' + objtToModify.constructor.name + ' has no configurable descriptor');

        if (typeof getFunct !== 'function')
            throw new Error("Invalid get function provided");

        if (! objtToModify[this.utils.mcopUtilsName]) {
            objtToModify[this.utils.mcopUtilsName] = this.utils;
        }

        const newDetails = {
            enumerable: true,
            configurable: true,
            get: function () {
                return getFunct.call(this, descriptor);
            }
        };

        if (typeof setFunct === 'function' && typeof descriptor.set === 'function') {
            newDetails['set'] = function (value) {
                setFunct.call(this, descriptor, value);
            }
        }

        const mcopOriginalProp = this.utils.originalPrefix + this.utils.ucFirst(propName);
        if (! (mcopOriginalProp in objtToModify)) {
            Object.defineProperty(objtToModify, mcopOriginalProp, descriptor);
            Object.defineProperty(objtToModify, propName, newDetails);
        }
    };

    __Mcop.prototype.modifyMethodOrConstructor = function (targetedObjt, methName, replacementFunct) {
        if (typeof targetedObjt !== "object")
            throw new Error("Invalid object to modify");

        if (typeof methName !== "string" || methName.length === 0)
            throw new Error("Invalid method name");

        if (! methName in targetedObjt)
            throw new Error("the method " + methName + ' does not exist in ' + targetedObjt.constructor.name);

        if (typeof replacementFunct !== 'function')
            throw new Error("the replacement function is not valid");

        if (! targetedObjt[this.utils.mcopUtilsName]) {
            targetedObjt[this.utils.mcopUtilsName] = this.utils;
        }

        const mcopOriginalMeth = this.utils.originalPrefix + this.utils.ucFirst(methName);
        if (! targetedObjt[mcopOriginalMeth]) {
            targetedObjt[mcopOriginalMeth] = targetedObjt[methName];
            targetedObjt[methName] = replacementFunct;
        }
    };

    __Mcop.prototype.initScope = function () {
        const thisProxy = this;
        this.modifyMethodOrConstructor(this.scope, 'fetch', async function () {
            if (thisProxy.utils.isBlockedDomain(arguments[0]) || thisProxy.utils.isBlockedDomain(arguments[0].url))
                return new Response("");

            const staticFilesRegexp = thisProxy.activeProxyMethod().regExp;

            if (arguments[0] instanceof  Request) {
                let referrer = '';
                if (('referrer' in arguments[0])) {
                    if (arguments[0].referrer === 'no-referrer' || arguments[0].referrer === 'client') {
                        referrer = arguments[0].referrer;
                    } else {
                        referrer = thisProxy.modifyUrl(arguments[0].referrer);
                    }
                }

                let requestOptions = {
                    method: arguments[0].method,
                    headers: new Headers(arguments[0].headers),
                    mode: 'cors',
                    cache: 'default',
                    credentials: 'include',
                    redirect: arguments[0].redirect,
                    referrer: referrer
                };

                let finalUrl = thisProxy.modifyUrl(arguments[0].url);
                if (staticFilesRegexp && staticFilesRegexp.test(arguments[0].url) &&  /:\/\//.test(arguments[0].url)) {
                    if (thisProxy.utils.urlContainsOriginalHost(arguments[0].url)) {
                        const originalHost = thisProxy.utils.extractOriginalHost(arguments[0].url);
                        const relativeUrl = thisProxy.utils.removeOriginalHostAndGetRelativeUrl(arguments[0].url);
                        if (typeof originalHost === 'string' && originalHost.length > 0 &&
                            typeof relativeUrl === 'string' && relativeUrl.length > 0) {
                            finalUrl = `https://${originalHost}${relativeUrl}`;
                        } else {
                            finalUrl = arguments[0].url;
                        }
                    } else {
                        finalUrl = arguments[0].url;
                    }

                    requestOptions['mode'] = 'no-cors';
                }

                //console.log(requestOptions.Body);
                if (/^post$/i.test(arguments[0].method)) {
                    requestOptions.body = await arguments[0].arrayBuffer();
                }
                arguments[0] = new Request(finalUrl, requestOptions);
            } else if (typeof arguments[0] === 'string' || thisProxy.utils.hasToString(arguments[0])) {
                if (!(staticFilesRegexp && staticFilesRegexp.test(arguments[0]) &&  /:\/\//.test(arguments[0].url))) {
                    arguments[0] = thisProxy.modifyUrl(arguments[0]);
                }

                if (typeof arguments[1] === 'object' && arguments[1].referrer) {
                    arguments[1].referrer = thisProxy.modifyUrl(arguments[1].referrer);
                }

                if (typeof arguments[1] === 'object' && arguments[1]['integrity']) {
                    delete arguments[1]['integrity'];
                }
            }

            return thisProxy.scope[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('fetch')].call(thisProxy.scope, ...arguments);
        });

        //We modify the scope propery on ServiceWorkerRegistration.prototype
        this.modifyProperty(this.scope.ServiceWorkerRegistration.prototype, 'scope', function (descriptor) {
            return thisProxy.modifyUrl(descriptor.get.call(this));
        });

        if (this.scope.XMLHttpRequest && this.scope.XMLHttpRequest.prototype) {
            //We modify the open method of XMLHttpRequest.prototype
            this.modifyMethodOrConstructor(this.scope.XMLHttpRequest.prototype, 'open', function () {
                if (typeof arguments[1] === 'string' || thisProxy.utils.hasToString(arguments[1])) {
                    arguments[1] = thisProxy.modifyUrl(arguments[1]);
                }
                this[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('open')].apply(this, arguments);
            });


            //We replace the responseURL property on XMLHttpRequest.prototype
            this.modifyProperty(this.scope.XMLHttpRequest.prototype, 'responseURL', function (descriptor) {
                return thisProxy.modifyUrl(descriptor.get.call(this));
            });
        }

        const preparePostMsgOrigin = '_mcopPreparePostMessageOrigin';
        if (! this.scope[preparePostMsgOrigin]) {
            this.scope[preparePostMsgOrigin] = function(realOrigin) {
                let returnedOrigin = realOrigin;
                //console.log(realOrigin + '\n\n\n');

                if (/^http:\/\//.test(realOrigin)) {
                    returnedOrigin = thisProxy.scope.location.origin;
                    if (thisProxy.scope.location.port.length > 0) {
                        returnedOrigin += ':' + thisProxy.scope.location.port;
                    } else {
                        returnedOrigin += ':' + thisProxy.utils.httpPort;
                    }
                } else if (/^https:\/\//.test(realOrigin)) {
                    returnedOrigin = thisProxy.scope.location.origin;
                    if (thisProxy.scope.location.port.length > 0) {
                        returnedOrigin += ':' + thisProxy.scope.location.port;
                    } else {
                        returnedOrigin += ':' + thisProxy.utils.httpsPort;
                    }
                }

                return returnedOrigin;
            };

            if (thisProxy.inWindowScope()) {
                thisProxy.scope['Window']['prototype'][preparePostMsgOrigin] = this.scope[preparePostMsgOrigin];
                thisProxy.scope['document'][preparePostMsgOrigin] = this.scope[preparePostMsgOrigin];
            }
        }

        const preparePostMsgData = '_mcopPreparePostMessageMsg';
        if (! this.scope[preparePostMsgData]) {
            this.scope[preparePostMsgData] = function(originalMsg) {
                return (typeof originalMsg === 'object') ? JSON.stringify(originalMsg) : originalMsg;
            };

            if (thisProxy.inWindowScope()) {
                thisProxy.scope['Window']['prototype'][preparePostMsgData] = this.scope[preparePostMsgData];
                thisProxy.scope['document'][preparePostMsgData] = this.scope[preparePostMsgData];
            }
        }

        if (this.scope.MessageEvent) {
            this.modifyProperty(this.scope.MessageEvent.prototype, 'origin', function (descriptor) {
                const __mcopLocation = this.source[thisProxy.utils.mcopLocationName];
                let returnedOrigin = __mcopLocation.origin;

                if (/^http:\/\//.test(returnedOrigin)) {
                    if (__mcopLocation.port.length > 0) {
                        returnedOrigin += ':' + __mcopLocation.port;
                    } else {
                        returnedOrigin += ':' + thisProxy.utils.httpPort;
                    }
                } else if (/^https:\/\//.test(returnedOrigin)) {
                    if (__mcopLocation.port.length > 0) {
                        returnedOrigin += ':' + __mcopLocation.port;
                    } else {
                        returnedOrigin += ':' + thisProxy.utils.httpsPort;
                    }
                }

                return returnedOrigin;
            });

            this.modifyProperty(this.scope.MessageEvent.prototype, 'data', function (descriptor) {
                return descriptor.get.call(this);
            });
        }

        if (this.scope.ExtendableMessageEvent) {
            this.modifyProperty(this.scope.ExtendableMessageEvent.prototype, 'origin', function (descriptor) {
                return thisProxy.modifyUrl(descriptor.get.call(this));
            });

            this.modifyProperty(this.scope.ExtendableMessageEvent.prototype, 'data', function (descriptor) {
                return descriptor.get.call(this);
            });
        }

        return this;
    };

    __Mcop.prototype.initWindow = function () {
        if (! this.inWindowScope())
            return;

        const thisProxy = this;

        class McopCookie {
            constructor(cookieStr){
                if (typeof cookieStr !== 'string' || cookieStr.length === 0){
                    this.cookieStr = '';
                } else {
                    this.cookieStr = cookieStr;
                }

                this.name = this.value = null;
                this.attributes = {};
            }

            /**
             * Returns the cookie's name or null
             * @return {null|string}
             */
            getName(){
                return this.name;
            }

            /**
             * Returns the cookie's value or null.
             * @return {null|string}
             */
            getValue(){
                return (/[=\/]/.test(this.value)) ? encodeURIComponent(this.value) : this.value;
            }

            /**
             * extracts the cookie's name and its value then returns true; in case it failed it returns false.
             * @return {boolean}
             */
            extractNameAndValue() {
                if (typeof this.cookieStr !== "string" || this.cookieStr.length === 0)
                    return false;

                if (typeof this.name === 'string' && typeof this.value === 'string')
                    return true;


                let currentCookie = this.cookieStr + "";
                currentCookie = currentCookie.replace(/\s/g, "");
                const cookieParts = currentCookie.split(";");
                if (cookieParts.length === 0)
                    return false;

                //Get name=value
                currentCookie = cookieParts[0];

                let value = '';
                let name = '';

                if (/^[a-z0-9_\-~%$#@!.]+=/i.test(currentCookie)) {
                    value = currentCookie.replace(/^[a-z0-9_\-~%$#@!.]+=/i, "") + "";
                    const equalAndValue = "=" + value;
                    name = currentCookie.replace(equalAndValue, "") + "";
                }


                if (name.length === 0 || value.length === 0)
                    return false;

                this.name = name;
                this.value = value;

                return true;
            }

            /**
             * Returns the value of an attribute or returns null.
             * **NB. The following cookie attribute can be returned: expires, max-age, domain, path and samesite.
             * @param {string} name a case-insensitive string representing an attribute's name.
             * @return {null|string}
             */
            getAttribute(name) {
                if (typeof name !== "string" || ! /^expires$|^max-age$|^domain$|^path$|^samesite$/i.test(name))
                    return null;

                if (this.attributes[name])
                    return this.attributes[name];

                const regExp = new RegExp(name + "=.+;*", 'i');
                const matches = this.cookieStr.match(regExp, name);
                if (matches === null)
                    return null;

                const exploded = matches[0].split("=");
                let value = exploded[1].replace(/;.*/, "");
                if (/^domain$/i.test(name)) {
                    if (value.charAt(0) === '.') {
                        value = value.substr(1);
                    }
                }
                this.attributes[name] = value;

                return value;
            }
        }

        class McopElement {
            constructor(element) {
                if (! (typeof element === 'object' && element instanceof thisProxy.scope.Element))
                    throw new Error(element + " must be an instance of Element");
                this.element = element;
            }

            static create(element) {
                return new McopElement(element);
            }

            getTagName() {
                if ('tagName' in this.element) {
                    return ('' + this.element.tagName).toLowerCase();
                }

                return null;
            }

            hasAttr(name) {
                return this.element.hasAttribute(name);
            }

            removeAttr(name) {
                this.element.removeAttribute(name);
            }

            getAttr(name) {
                return this.element.getAttribute(name);
            }

            setAttr(name, value) {
                if (name && value) {
                    this.element[name] = value;
                    this.element.setAttribute(name, value);
                }
                return this;
            }

            setOriginalValueOf(name) {
                const prop = ('' + thisProxy.utils.originalValueOf + name).toLowerCase();
                const value = this.getAttr(name);
                this.setAttr(prop, value);
            }

            targetedTags() {
                const thisElement = this;
                return {
                    'a': {
                        modify: function () {
                            const name = 'href';
                            const value = thisElement.getAttr(name);
                            if (typeof value === 'string' && thisProxy.isAbsoluteUrl(value)) {
                                thisElement.setAttr(name, thisProxy.modifyUrl(value));
                            }
                        }
                    },
                    'link': {
                        modify: function () {
                            const name = 'href';
                            const value = thisElement.getAttr(name);
                            if (typeof value === 'string') {
                                thisElement.modifyAttribute(name, thisProxy.modifyUrl(value));
                            }
                        }
                    },
                    'area': {
                        modify: function () {
                            const name = 'href';
                            const value = thisElement.element[name];
                            if (typeof value === 'string') {
                                thisElement.modifyAttribute(name, thisProxy.modifyUrl(value));
                            }
                        }
                    },
                    'form': {
                        modify: function () {
                            const name = 'action';
                            const value = thisElement.getAttr(name);
                            if (typeof value === 'string' && thisProxy.isAbsoluteUrl(value)) {
                                thisElement.setAttr(name, thisProxy.modifyUrl(value));
                            }
                        }
                    },
                    'script': {
                        modify: function () {
                            const name = 'src';
                            const value = thisElement.element[name];
                            if (typeof value === 'string')
                                thisElement.modifyAttribute(name, thisProxy.modifyUrl(value));
                        }
                    },
                    'video': {
                        modify: function () {
                            const name = 'src';
                            const value = thisElement.element[name];
                            if (typeof value === 'string') {
                                thisElement.modifyAttribute(name, thisProxy.modifyUrl(value));
                            }
                        }
                    },
                    'audio': {
                        modify: function () {
                            const name = 'src';
                            const value = thisElement.element[name];
                            if (typeof value === 'string') {
                                thisElement.modifyAttribute(name, thisProxy.modifyUrl(value));
                            }
                        }
                    },
                    'source': {
                        modify: function () {
                            const name = 'src';
                            const value = thisElement.element[name];
                            if (typeof value === 'string') {
                                thisElement.modifyAttribute(name, thisProxy.modifyUrl(value));
                            }
                        }
                    },
                    'object': {
                        modify: function () {
                            const name = 'data';
                            const value = thisElement.getAttr(name);
                            if (typeof value === 'string') {
                                thisElement.modifyAttribute(name, thisProxy.modifyUrl(value));
                            }
                        }
                    },
                    'iframe': {
                        modify: function () {
                            if (thisElement.hasAttr('sandbox'))
                                thisElement.removeAttr('sandbox');
                           const name = 'src';

                            if (thisElement.hasAttr(name)) {
                                const value = thisElement.getAttr(name);
                                if (! value.startsWith(thisProxy.scope.location.origin) && value.length > 0 && ! thisProxy.isBrowserInternalUrl(value)) {
                                    const newValue = thisProxy.modifyUrl(value);
                                    thisElement.element[name] = newValue;
                                    thisElement.modifyAttribute(name, newValue);
                                }
                            } else {
                                //console.log(thisElement.element.contentWindow);
                            }
                        }
                    },
                    'img': {
                        modify: function () {
                            const name = 'src';
                            const value = thisElement.getAttr(name);
                            if (typeof value === 'string') {
                                thisElement.modifyAttribute(name, thisProxy.modifyUrl(value));
                            }
                        }
                    },
                };
            }

            modifyAttribute(name, newValue){
                if (this.hasAttr(name) && newValue) {
                    this.setOriginalValueOf(name);
                    this.setAttr(name, newValue);
                }
            }

            hasBeenVisited() {
                return (this.hasAttr(thisProxy.utils.mcopp) || this[thisProxy.utils.mcopp]);
            }

            markAsVisited() {
                this.setAttr(thisProxy.utils.mcopp, thisProxy.utils.mcoppValue);
            }

            markAsNotVisited() {
                if (this.hasAttr(thisProxy.utils.mcopp)) this.removeAttr(thisProxy.utils.mcopp);
            }

            isTargetedTag() {
                return typeof this.targetedTags()[this.getTagName()] === 'object';
            }

            isIFrame() {
                return this.getTagName().toLowerCase() === 'iframe';
            }

            modifyChildren() {
                if (!(this.element.children && this.element.children.length > 0))
                    return false;

                for (let id = 0; id < this.element.children.length; id++) {
                    if (this.element.children[id] instanceof thisProxy.scope.Element) {
                        (McopElement.create(this.element.children[id])).applyChanges();
                    }
                }
            }


            applyChanges() {
                //Remove visited attribute from any iframes
                if (this.isIFrame()) {
                    const name = 'src';
                    let value = this.element[name] + '';

                    if (! thisProxy.isBrowserInternalUrl(value)) {
                        this.removeAttr(thisProxy.utils.mcopp);
                    }

                } else if (this.getTagName().toLowerCase() === 'img') {
                    const name = 'src';
                    let value = this.element[name];
                    if (typeof value === 'string' && ! /[}\s]/.test(value) && ! value.startsWith(thisProxy.scope.location.origin)  && ! thisProxy.isBrowserInternalUrl(value)) {
                        if (! thisProxy.isAbsoluteUrl(value)) {
                            this.removeAttr(thisProxy.utils.mcopp);
                        }
                    }
                }

                if (! this.hasBeenVisited()) {
                    const tagName = this.getTagName().toLowerCase();
                    if (this.targetedTags()[tagName]) {
                        this.targetedTags()[tagName].modify();
                    } else if (this.hasAttr('url')) {
                        this.setAttr('url', thisProxy.modifyUrl(this.getAttr('url')));
                    }

                    this.modifyChildren();
                    this.markAsVisited();
                } else {
                    this.modifyChildren();
                }
            }
        }

        this.modifyProperty(this.scope.ServiceWorker.prototype, 'scriptURL', function (descriptor) {
            return thisProxy.modifyUrl(descriptor.get.call(this));
        });

        this.modifyProperty(this.scope.HTMLMediaElement.prototype, 'currentSrc', function (descriptor) {
            return thisProxy.modifyUrl(descriptor.get.call(this));
        });

        this.modifyProperty(this.scope.Document.prototype, 'referrer', function (descriptor) {
            return thisProxy.modifyUrl(descriptor.get.call(this));
        });

        this.modifyProperty(this.scope.HTMLAnchorElement.prototype, 'href', function (descriptor) {
            return thisProxy.modifyUrl(descriptor.get.call(this));
        });

        this.modifyProperty(this.scope.HTMLAreaElement.prototype, 'href', function (descriptor) {
            return thisProxy.modifyUrl(descriptor.get.call(this));
        });

        this.modifyProperty(this.scope.HTMLIFrameElement.prototype, 'src', function (descriptor) {
            return thisProxy.modifyUrl(descriptor.get.call(this));
        }, function (descriptor, value) {
            descriptor.set.call(this, thisProxy.modifyUrl(value));
        });

        this.modifyProperty(this.scope.HTMLIFrameElement.prototype, 'srcdoc', function (descriptor) {
            return descriptor.get.call(this);
        }, function (descriptor, value) {
            descriptor.set.call(this, value);
        });

        this.modifyProperty(this.scope.HTMLMediaElement.prototype, 'src', function (descriptor) {
            return thisProxy.modifyUrl(descriptor.get.call(this));
        }, function (descriptor, value) {
            descriptor.set.call(this, thisProxy.modifyUrl(value));
        });

        /*this.modifyProperty(this.scope.HTMLImageElement.prototype, 'src', function (descriptor) {
            let eltSrc = descriptor.get.call(this) + '';
            const baseElt = thisProxy.scope['document'].querySelector('base');
            if (thisProxy.isAbsoluteUrl(eltSrc) && ! baseElt)
                return eltSrc;


            let baseUri = this[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('baseURI')] + '';
            //Detect full urls with file extension like .html, .php, etc
            if (/\..+$/.test(baseUri)) {
                const parts = baseUri.split('/');
                const lastPart = parts[parts.length - 1];
                baseUri = baseUri.replace(`${lastPart}`, '');
            }

            eltSrc = eltSrc.replace(baseUri, this.baseURI);

            return eltSrc;
        }, function (descriptor, value) {
            descriptor.set.call(this, thisProxy.modifyUrl(value));
        });*/

        this.modifyProperty(this.scope.HTMLSourceElement.prototype, 'src', function (descriptor) {
            return thisProxy.modifyUrl(descriptor.get.call(this));
        }, function (descriptor, value) {
            descriptor.set.call(this, thisProxy.modifyUrl(value));
        });

        //We modify the native WebSocket constructor
        this.modifyMethodOrConstructor(this.scope, 'WebSocket', function () {
            const url = thisProxy.modifyUrl(arguments[0] + '');
            const protocols = arguments[1];
            return new thisProxy.scope[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('WebSocket')](url, protocols);
        });

        //We modify the native Worker constructor
        this.modifyMethodOrConstructor(this.scope, 'Worker', function () {
            const url = thisProxy.modifyUrl(arguments[0] + '');
            const opts = arguments[1];
            return new thisProxy.scope[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('Worker')](url, opts);
        });


        //We modify the native SharedWorker constructor
        this.modifyMethodOrConstructor(this.scope, 'SharedWorker', function () {
            arguments[0] = thisProxy.modifyUrl(arguments[0] + '');

            return new thisProxy.scope[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('SharedWorker')](...arguments);
        });

        //We modify the getRegistration method of ServiceWorkerContainer.prototype
        this.modifyMethodOrConstructor(this.scope.ServiceWorkerContainer.prototype, 'getRegistration', function () {
            arguments[0] = thisProxy.modifyUrl(arguments[0] + '');
            return this[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('getRegistration')].apply(this, arguments);
        });

        //We modify the replaceState method of History.prototype
        this.modifyMethodOrConstructor(this.scope.History.prototype, 'replaceState', function () {
            let stateObj = arguments[0], unused = arguments[1], url = arguments[2];
            if (typeof url === 'string' || thisProxy.utils.hasToString(url)) {
                url = thisProxy.modifyUrl(url);
            }
            this[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('replaceState')].call(this, stateObj, unused, url);
        });

        //We modify the pushState method of History.prototype
        this.modifyMethodOrConstructor(this.scope.History.prototype, 'pushState', function () {
            let stateObj = arguments[0], unused = arguments[1], url = arguments[2];
            if (typeof url === 'string' || thisProxy.utils.hasToString(url)) {
                url = thisProxy.modifyUrl(url);
            }
            this[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('pushState')].call(this, stateObj, unused, url);
        });

        /*this.modifyMethodOrConstructor(this.scope.Navigator.prototype, 'registerProtocolHandler', function () {
            //utils.printMsg('Protocol handlers registration not allowed', 'debug');
        });*/

        //We modify the open method of window
        this.modifyMethodOrConstructor(this.scope, 'open', function () {
            const url = thisProxy.modifyUrl(arguments[0]), target = arguments[1], windowFeatures = arguments[2];
            this[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('open')].call(this, url, target, windowFeatures);
        });


        this.modifyProperty(this.scope.HTMLScriptElement.prototype, 'integrity', function (descriptor) {
            return null;
        }, function (descriptor, value) {

        });

        /*this.modifyProperty(this.scope.HTMLScriptElement.prototype, 'src', function (descriptor) {
            console.log(descriptor.get.call(this));
            return thisProxy.modifyUrl(descriptor.get.call(this));
        }, function (descriptor, value) {
            descriptor.set.call(this, thisProxy.modifyUrl(value));
        });*/

        this.modifyProperty(this.scope.HTMLLinkElement.prototype, 'href', function (descriptor) {
            return thisProxy.modifyUrl(descriptor.get.call(this));
        }, function (descriptor, value) {
            descriptor.set.call(this, thisProxy.modifyUrl(value));
        });

        this.modifyMethodOrConstructor(this.scope.Node.prototype, 'appendChild', function () {
            const newChild = arguments[0];

            try {
                (new McopElement(newChild)).applyChanges();
            } catch (e) {}

            const addedChild = this[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('appendChild')].call(this, newChild);

            if (thisProxy.utils.isIFrame(addedChild) && ! addedChild.src) {
                if (addedChild.contentWindow) {
                    (new __Mcop(addedChild.contentWindow)).init();
                }
            }


            return addedChild;
        });

        this.modifyMethodOrConstructor(this.scope.Node.prototype, 'replaceChild', function () {
            const newChild = arguments[0], oldChild = arguments[1];
            try {
                (new McopElement(newChild)).applyChanges();
            } catch (e) {}
            const replaced = this[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('replaceChild')].call(this, newChild, oldChild);
            if (thisProxy.utils.isIFrame(newChild)) {
                if (newChild.contentWindow) {
                    (new __Mcop(newChild.contentWindow)).init();
                }
            }

            return replaced;
        });

        this.modifyMethodOrConstructor(this.scope.Node.prototype, 'insertBefore', function () {
            const newNode = arguments[0], referenceNode = arguments[1];

            try {
                (new McopElement(newNode)).applyChanges();
            } catch (e) {}


            const inserted = this[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('insertBefore')].call(this, newNode, referenceNode);
            if (thisProxy.utils.isIFrame(inserted)) {
                if (inserted.contentWindow) {
                    (new __Mcop(inserted.contentWindow)).init();
                }
            }

            return inserted;
        });

        /*this.modifyProperty(this.scope.Node.prototype, 'baseURI', function (descriptor) {
            const baseElt = thisProxy.scope['document'].querySelector('base');
            if (baseElt)
                return thisProxy.scope[thisProxy.utils.mcopLocationName].origin + '/';

            return thisProxy.modifyUrl(descriptor.get.call(this));
        });*/

        this.modifyMethodOrConstructor(this.scope.Element.prototype, 'setAttribute', function () {
            let attrName = arguments[0], attrValue = arguments[1];
            if (/^(src|href)$/.test(attrName + '') && typeof attrValue === 'string') {
                attrValue = thisProxy.modifyUrl(attrValue);
            }

            this[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('setAttribute')].call(this, attrName, attrValue);
        });

        this.modifyMethodOrConstructor(this.scope.Element.prototype, 'before', function () {
            //Modify nodes before injecting them
            for (let i = 0; i < arguments.length; i++) {
                try {
                    (new McopElement(arguments[i])).applyChanges();
                } catch (e) {}
            }

            const outcome = this[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('before')].apply(this, arguments);
            for (let i = 0; i < arguments.length; i++) {
                if (thisProxy.utils.isIFrame(arguments[i])) {
                    if (arguments[i].contentWindow) {
                        (new __Mcop(arguments[i].contentWindow)).init();
                    }
                }
            }

            return outcome;
        });

        this.modifyMethodOrConstructor(this.scope.Element.prototype, 'after', function () {
            //Modify nodes before injecting them
            for (let i = 0; i < arguments.length; i++) {
                try {
                    (new McopElement(arguments[i])).applyChanges();
                } catch (e) {}
            }

            const outcome = this[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('after')].apply(this, arguments);
            for (let i = 0; i < arguments.length; i++) {
                if (thisProxy.utils.isIFrame(arguments[i])) {
                    if (arguments[i].contentWindow) {
                        (new __Mcop(arguments[i].contentWindow)).init();
                    }
                }
            }

            return outcome;
        });

        this.modifyMethodOrConstructor(this.scope.Element.prototype, 'replaceWith', function () {
            //Modify nodes before injecting them
            for (let i = 0; i < arguments.length; i++) {
                try {
                    (new McopElement(arguments[i])).applyChanges();
                } catch (e) {}
            }

            const outcome = this[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('replaceWith')].apply(this, arguments);
            for (let i = 0; i < arguments.length; i++) {
                if (thisProxy.utils.isIFrame(arguments[i])) {
                    if (arguments[i].contentWindow) {
                        (new __Mcop(arguments[i].contentWindow)).init();
                    }
                }
            }

            return outcome;
        });

        this.modifyMethodOrConstructor(this.scope.Element.prototype, 'append', function () {
            //Modify nodes before injecting them
            for (let i = 0; i < arguments.length; i++) {
                try {
                    (new McopElement(arguments[i])).applyChanges();
                } catch (e) {}
            }

            const outcome = this[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('append')].apply(this, arguments);
            for (let i = 0; i < arguments.length; i++) {
                if (thisProxy.utils.isIFrame(arguments[i])) {
                    if (arguments[i].contentWindow) {
                        (new __Mcop(arguments[i].contentWindow)).init();
                    }
                }
            }

            return outcome;
        });

        this.modifyMethodOrConstructor(this.scope.Element.prototype, 'prepend', function () {
            //Modify nodes before injecting them
            for (let i = 0; i < arguments.length; i++) {
                try {
                    (new McopElement(arguments[i])).applyChanges();
                } catch (e) {}
            }

            const outcome = this[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('prepend')].apply(this, arguments);
            for (let i = 0; i < arguments.length; i++) {
                if (thisProxy.utils.isIFrame(arguments[i])) {
                    if (arguments[i].contentWindow) {
                        (new __Mcop(arguments[i].contentWindow)).init();
                    }
                }
            }

            return outcome;
        });

        this.modifyMethodOrConstructor(this.scope.Element.prototype, 'insertAdjacentHTML', function () {
            return this[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('insertAdjacentHTML')].apply(this, arguments);
        });


        this.modifyMethodOrConstructor(this.scope.Element.prototype, 'insertAdjacentElement', function () {
            try {
                (new McopElement(arguments[1])).applyChanges();
            } catch (e) {}

            const inserted = this[thisProxy.utils.originalPrefix + thisProxy.utils.ucFirst('insertAdjacentElement')].apply(this, arguments);
            if (thisProxy.utils.isIFrame(inserted)) {
                if (inserted.contentWindow) {
                    (new __Mcop(inserted.contentWindow)).init();
                }
            }

            return inserted;
        });

        this.modifyProperty(this.scope.Element.prototype, 'innerHTML', function (descriptor) {
            return descriptor.get.call(this);
        }, function (descriptor, value) {
            descriptor.set.call(this, value);
        });

        this.modifyProperty(this.scope.Element.prototype, 'outerHTML', function (descriptor) {
            return descriptor.get.call(this);
        }, function (descriptor, value) {
            descriptor.set.call(this, value);
        });

        this.modifyProperty(this.scope.Document.prototype, 'cookie', function (descriptor) {
            return descriptor.get.call(this);
        }, function (descriptor, value) {
            const cookie = new McopCookie(value);
            cookie.extractNameAndValue();
            if (typeof cookie.getName() === 'string' && typeof cookie.getValue() === 'string') {
                let domain = cookie.getAttribute('domain');
                const samesite = cookie.getAttribute('samesite');
                const path = cookie.getAttribute('path');
                let name = cookie.getName();

                if (typeof domain === 'string' && ! /MCOP-SWREADY/.test(name)) {
                    if (thisProxy.scope[thisProxy.utils.locationName].origin.includes(domain))
                        domain = thisProxy.scope[thisProxy.utils.mcopLocationName].hostname;

                    name = name + '@' + domain;
                } else {
                    name = name + '@' + thisProxy.getRealHost();
                }

                let cookieStr = name + '=' + cookie.getValue() + ';';
                if (path !== null)
                    cookieStr += 'Path=' + path + ';';
                if (samesite !== null)
                    cookieStr += 'SameSite=' + samesite + ';';
                descriptor.set.call(this, cookieStr);
            }
        });

        const domObserver = new this.scope.MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function (currentNode) {
                        if(currentNode instanceof thisProxy.scope.Element) {
                            try{
                                const mcopElt = new McopElement(currentNode);
                                mcopElt.applyChanges();
                            } catch (error){
                                console.log(error);
                            }
                        }
                    });
                } else {
                    if (mutation.type === 'attributes' && mutation.attributeName === thisProxy.utils.mcopp) {
                        return;
                    }

                    if (mutation.target  instanceof thisProxy.scope.Element) {
                        try{
                            const mcopElt = new McopElement(mutation.target);

                            if (mcopElt.hasBeenVisited() && mcopElt.isIFrame()) {
                                mcopElt.markAsNotVisited();
                            }

                            mcopElt.applyChanges();
                        } catch (error){
                            console.log(error);
                        }
                    }
                }
            });
        });

        // configuration of the observer:
        domObserver.observe(thisProxy.scope.document.documentElement, {
            attributes: true, childList: true, characterData: true, subtree: true, attributeOldValue: true, characterDataOldValue: true
        });

        //(new McopElement(thisProxy.scope.document.documentElement)).applyChanges();

        return this;
    };


    __Mcop.prototype.initLocation = function () {
        const thisProxy = this;

        function McopLocation(expectedUrl) {
            if (typeof expectedUrl !== "string")
                throw  new Error('Invalid real url provided to McopLocation constructor: ' + expectedUrl);

            this.expectedUrl = expectedUrl;

            if (expectedUrl !== thisProxy.utils.aboutBlank) {
                this.URL = new URL(expectedUrl);
                const thisLocation = this;
                const interval = setInterval(function () {
                    if (typeof thisProxy.scope.location.hash === 'string' && thisProxy.scope.location.hash !== thisLocation.URL.hash) {
                        let fullUrl = thisLocation.URL.protocol + "//" + thisLocation.URL.host;
                        fullUrl += thisLocation.URL.pathname + thisLocation.URL.search + thisProxy.scope.location.hash;
                        thisLocation.URL.href = fullUrl;
                        thisLocation.URL.hash = thisProxy.scope.location.hash;
                    }
                }, 5);
            }
        }

        Object.defineProperty(McopLocation.prototype, 'href', {
            enumerable: true,
            configurable: true,
            get: function () {
                return (this.expectedUrl !== thisProxy.utils.aboutBlank) ? this.URL.href : thisProxy.utils.aboutBlank;
            },
            set: function (newHref) {
                console.log(newHref);
                let modifiedHref = thisProxy.modifyUrl(newHref);
                if (/^\//.test(modifiedHref)) {
                    modifiedHref = "https://" + this.URL.host + modifiedHref;
                }
                thisProxy.scope.location.href = modifiedHref;
                this.URL.href = modifiedHref;
            }
        });

        Object.defineProperty(McopLocation.prototype, 'protocol', {
            enumerable: true,
            configurable: true,
            get: function () {
                return (this.expectedUrl !== thisProxy.utils.aboutBlank) ? this.URL.protocol : "about:";
            },
            set: function (protocol) {
                if (typeof protocol === 'string') {
                    this.URL.protocol = protocol;
                    thisProxy.scope.location.protocol = protocol;
                }
            }
        });

        Object.defineProperty(McopLocation.prototype, 'host', {
            enumerable: true,
            configurable: true,
            get: function () {
                return (this.expectedUrl !== thisProxy.utils.aboutBlank) ? this.URL.host : "";
            },
            set: function (host) {
                if (typeof host === 'string') {
                    this.URL.host = host;
                    thisProxy.scope.location.host = host;
                }
            }
        });

        Object.defineProperty(McopLocation.prototype, 'hostname', {
            enumerable: true,
            configurable: true,
            get: function () {
                return (this.expectedUrl !== thisProxy.utils.aboutBlank) ? this.URL.hostname : "";
            },
            set: function (hostname) {
                if (typeof hostname === 'string') {
                    this.URL.hostname = hostname;
                    thisProxy.scope.location.hostname = hostname;
                }
            }
        });

        Object.defineProperty(McopLocation.prototype, 'port', {
            enumerable: true,
            configurable: true,
            get: function () {
                return (this.expectedUrl !== thisProxy.utils.aboutBlank) ? this.URL.port : "";
            },
            set: function (port) {
                if (typeof port === 'string') {
                    this.URL.port = port;
                    thisProxy.scope.location.port = port;
                }
            }
        });

        Object.defineProperty(McopLocation.prototype, 'pathname', {
            enumerable: true,
            configurable: true,
            get: function () {
                return (this.expectedUrl !== thisProxy.utils.aboutBlank) ? this.URL.pathname : "blank";
            },
            set: function (pathname) {
                if (typeof pathname === 'string') {
                    this.URL.pathname = pathname;
                    thisProxy.scope.location.pathname = pathname;
                }
            }
        });

        Object.defineProperty(McopLocation.prototype, 'search', {
            enumerable: true,
            configurable: true,
            get: function () {
                return (this.expectedUrl !== thisProxy.utils.aboutBlank) ? this.URL.search : "";
            },
            set: function (search) {
                if (typeof search === 'string') {
                    this.URL.search = search;
                    thisProxy.scope.location.search = search;
                }
            }
        });

        Object.defineProperty(McopLocation.prototype, 'hash', {
            enumerable: true,
            configurable: true,
            get: function () {
                return (this.expectedUrl !== thisProxy.utils.aboutBlank) ? this.URL.hash : "";
            },
            set: function (newHash) {
                this.URL.hash = newHash;
                thisProxy.scope.location.hash = newHash;
            }
        });

        Object.defineProperty(McopLocation.prototype, 'origin', {
            enumerable: true,
            configurable: true,
            get: function () {
                if (this.expectedUrl === thisProxy.utils.aboutBlank)
                    return "null";

                //We are in an embedded window (for example in an iFrame, frame, etc)
                /*if (! thisProxy.isTopWindow()) {
                    //The current window's origin should be the one of the top window
                    expectedOrigin = thisProxy.scope.top.origin;
                }*/

                return this.URL.origin;
            }
        });

        McopLocation.prototype.assign = function(url) {
            const newUrl = thisProxy.modifyUrl(url);

            thisProxy.scope.location.assign(newUrl);
        };

        McopLocation.prototype.reload = function(forceReload) {
            thisProxy.scope.location.reload(forceReload);
        };

        McopLocation.prototype.replace = function(url) {
            const newUrl = thisProxy.modifyUrl(url);
            thisProxy.scope.location.replace(newUrl);
        };

        McopLocation.prototype.toString = function() {
            return this.URL.toString();
        };

        const realUrl = thisProxy.getRealUrl();
        const __mcopLocation = new McopLocation(realUrl);
        const mcopLocationDescriptor = {
            get: function () {
                return __mcopLocation;
            },
            set: function (href) {
                if (typeof href === "string") {
                    thisProxy.scope[thisProxy.utils.locationName].replace(thisProxy.modifyUrl(href));
                }
            },
            enumerable: true,
            configurable: true
        };

        if (thisProxy.inWindowScope()) {
            Object.defineProperty(thisProxy.scope, thisProxy.utils.mcopLocationName,  mcopLocationDescriptor);
            Object.defineProperty(thisProxy.scope['Window']['prototype'], thisProxy.utils.mcopLocationName,  mcopLocationDescriptor);
            Object.defineProperty(thisProxy.scope['document'], thisProxy.utils.mcopLocationName,  mcopLocationDescriptor);
        } else {
            Object.defineProperty(thisProxy.scope, thisProxy.utils.mcopLocationName,  mcopLocationDescriptor);
        }

        return this;
    };

    __Mcop.prototype.init = function () {
        this.initScope()
            .initLocation()
            .initWindow();

        if (this.inWindowScope()) {
            if (this.isTopWindow()) {
                this.installServiceWorker();
            }
        }
    };

    (new __Mcop(self)).init();
})();