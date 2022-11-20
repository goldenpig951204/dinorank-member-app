"use strict";

const https = require("https");
const http = require("http");
const process = require("process");

//http.globalAgent.maxSockets = Infinity;
//https.globalAgent.maxSockets = Infinity;


module.exports.create = function (secured = true) {
    return new WebClient(secured);
};


/**
 * This class represents a web client.
 * ##### Constructor's behavior:
 * in case **secured** is not a boolean it throws an error with the message __secured can only be a boolean__
 * @param {boolean} secured a boolean indicating whether the client will use secure connections (HTTPS) or not (HTTP). True means HTTPS  and False means HTTP.
 * @class WebClient
 * @namespace app
 * @constructor
 * @since 4.8.5
 */
function WebClient(secured = true) {
    if (typeof secured !== 'boolean') {
        throw new Error("secured can only be a boolean");
    }

    this.secured = secured;
    if (secured) {
        this.secured = true;
        this.port = 443;
        this.httpClient = https;
    } else {
        this.port = 80;
        this.httpClient = http;
    }

    this.defaultTimeout = 60000;
}


/**
 * Sets the port number used by the client to connect to web servers or throws an exception with the message
 * __Invalid port number__ in case the port is not an integer in the range [1 - 65535]
 * @param {Number} port a positive integer in the range [1 - 65535], representing the port number that will be used
 * by the web client throughout all requests.
 * @method setPort
 */
WebClient.prototype.setPort = function (port) {
    if (typeof port === 'string' && port.length > 0 && ! /[^0-9]/.test(port)) {
        port = Number.parseInt(port);
    }  else if (typeof port !== 'number' || ! Number.isInteger(port) || ! (port >= 1 && port <= 65535)) {
        throw new Error("Invalid port number");
    }

    this.port = port;
};

/**
 * Returns the client's current default port.
 * @method getPort
 * @returns {number|*}
 */
WebClient.prototype.getPort = function () {
    return this.port;
};

WebClient.prototype.setTimeout = function (timeout) {
    if (typeof timeout !== 'number' || ! Number.isInteger(timeout)) {
        return false;
    }

    this.defaultTimeout = timeout;
    return true;
};

/**
 *
 */
WebClient.prototype.acceptUnverifiedSslCertificates = function () {
    if (this.secured = true) {
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    }
};


/**
 * Sends a request (GET, HEAD, POST, DELETE ,PUT or OPTIONS) to a web server. In case the request was executed hassle free it returns a _Promise_
 * which is resolved to an object with the following properties:
 * * **statusCode** a positive integer representing the server's response status code.
 * * **headers** an object representing the headers sent by the server.
 * * **body** an {Array} representing the response body sent by the server.
 * In case the request failed it returns a _Promise_ that is rejected with the error message.
 * ##### List of some error messages:
 * * **Invalid method** shown when **method** is not among the list of supported messages (ie GET, POST, DELETE ,PUT, OPTIONS or HEAD)
 * * **Invalid host name** shown when **hostname** is not a non-empty string.
 * * **Invalid host name** shown when **path** is not a non-empty string.
 * @method sendRequest
 * @param {string} method a string representing the request's method. It can be GET, POST, DELETE ,PUT or OPTIONS. This parameter is case insensitive.
 * @param {string} hostname a string representing a domain name or IP address to which the request will be made.
 * @param {string} path a string representing the resource which is requested on the hostname.
 * @param {Object} headers an object containing the request's headers.
 * @param {string|Buffer} body a string or Buffer representing the request's body.
 * @returns {Promise<any>}
 */
WebClient.prototype.sendRequest = function (method, hostname, path, headers = {}, body = '') {
    const thisClient =  this;
    return new Promise(function (resolve, reject) {
        try {
            if (!/^get$|^post$|^put$|^delete$|^options$|^head$|^connect$|^trace|^patch$/i.test(method + '')) {
                reject('Invalid method');
                return;
            }

            if (typeof hostname !== 'string' || hostname.length === 0) {
                reject('Invalid host name');
                return;
            }

            if (typeof path !== 'string' || path.length === 0) {
                reject('Invalid path');
                return;
            }

            let reqHeaders = {};
            if (typeof headers === 'object') {
                reqHeaders = headers;
            }

            const options = {
                hostname: hostname,
                port: thisClient.port,
                path: path,
                method: method,
                headers: reqHeaders,
                timeout: thisClient.defaultTimeout
            };
            const request = thisClient.httpClient.request(options, function (response) {
                let receivedData = [];

                try {
                    response.on('data', function(chunk) {
                        receivedData.push(chunk);
                    }).on("end", function () {
                        const result = {
                            statusCode: response.statusCode,
                            headers: response.headers,
                            body: receivedData
                        };
                        resolve(result);
                    });
                } catch (error) {
                    reject(error);
                }
            }).on('error', function(error) {
                reject(error);
            }).on('timeout', function() {
                reject("Request timeout of " + thisClient.defaultTimeout + " milliseconds reached");
                request.end();
            });

            if (typeof body === 'string' && body.length > 0) {
                request.end(body);
            } else {
                try {
                    const reqBuffer = Buffer.from(body, "utf-8");
                    request.end(reqBuffer);
                } catch (error) {
                    reject(error);
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};