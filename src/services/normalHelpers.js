"use strict";

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const zlib = require("zlib");
const timers = require("timers");
const resolve = require("resolve");

const internalHelpers = {
    decompressData : function(compressedData, decompressStream, resolve, reject) {
        let buffer = Buffer.from('', 'utf8');

        decompressStream.write(compressedData);
        decompressStream.end();

        decompressStream.on('data', function (chunk) {
            buffer = Buffer.concat([buffer, chunk]);
        });

        decompressStream.on('end', function () {
            resolve(buffer);
        });

        decompressStream.on('error', function (error) {
            reject(error);
        });
    }
};

module.exports = new Utils();

function Utils() {}



/**
 * Returns a random user agent string. There are four possibilities:
 *
 * * Chrome on Windows 7 x64 (*Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36*)
 * * Edge on Windows 10 x64 (*Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246*)
 * * Firefox on Windows 7 x64 (*Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0*)
 * * Firefox on Ubuntu x64 (*Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:57.0) Gecko/20100101 Firefox/57.0*)
 * @method randomUserAgent
 * @param {Number} preferredUserAgentNumber an integer (between 0 and 3) indicating the preferred user agent string to be returned.
 */
Utils.prototype.randomUserAgent = function (preferredUserAgentNumber) {
    const userAgents = [
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246",
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0",
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:57.0) Gecko/20100101 Firefox/57.0"
    ];

    if (typeof preferredUserAgentNumber === 'number' && Number.isInteger(preferredUserAgentNumber)) {
        return userAgents[preferredUserAgentNumber];
    }

    const index = Math.floor(Math.random() * Math.floor(4));
    return userAgents[index];
};

/**
 * If min and max are both positive integers and max > min it generates a random token of a length in the range [min - max];
 * otherwise in generates a token with a length in the range [10 - 15].
 * @method randCode
 * @param {number} min a positive integer representing the minimum length of the generated token (the default value is 10)
 * @param {number} max a positive integer representing the maximum length of the generated token (the default value is 15)
 * @param hasSymbol a boolean indicating whether the token should contain a symbol (any of these **!**, **_**, **@**); the default value is false
 * @return {string}
 */
Utils.prototype.randCode = function (min = 10, max = 15, hasSymbol = false) {
    const SYMBOL = 3;
    const LETTER = 1;
    const DIGIT = 2;
    const UPPERCASE = 4;
    const LOWERCASE = 5;

    let realMin = min, realMax = max;
    if (typeof min !== "number" || min <= 0 || /[^0-9]/.test(min + "")) {
        realMin = 10;
    }

    if (typeof max !== "number" || max <= 0 || /[^0-9]/.test(max + "")) {
        realMax = 15;
    }

    if (max < min || max === min) {
        realMin = 10;
        realMax = 15;
    }

    const length = this.randomInt(realMin, realMax);
    const letters = ['a','b','c','d','e','f',
        'g','h','i','j','k','l',
        'm','n','o','p','q','r',
        's','t','u','v','w','x',
        'y','z'];
    const symbols = ['_', '!', '@'];
    let finalCode = '';
    let currentCharType = -1;

    for (let i = 1; i <= length; i++) {
        if(hasSymbol) {
            currentCharType = this.randomInt(1, 3);
        } else {
            currentCharType = this.randomInt(1, 2);
        }

        if (currentCharType === SYMBOL) {
            let randKey = this.randomInt(1, 3) - 1;
            finalCode += symbols[randKey];
        } else if (currentCharType === LETTER) {
            let randKey = this.randomInt(1, 26) - 1;
            let letterCase = this.randomInt(4, 5);
            if (letterCase === LOWERCASE) {
                finalCode += letters[randKey];
            } else {
                finalCode += letters[randKey].toUpperCase();
            }
        } else {
            finalCode += this.randomInt(1, 10) - 1;
        }
    }

    return finalCode;
};

/**
 * This function behaves as follows:
 * * if _max > min_ and min and max are both positive integers; it returns a positive integer between min and max
 * * if _min_ or _max_ is not a positive integer; it returns 0
 * * if _min_ or _max_ is equal to 0; it returns 0
 * * if _max < min_; it returns min
 * * if _max is equal to _min_; it returns min
 * ###### Example:
 *      const myUtils = require("./Utils");
 *      console.log(myUtils.randomInt(2, 5)); // outputs a random int in range [2 - 5]
 *      console.log(myUtils.randomInt(0.9, 5)); // outputs 0
 *      console.log(myUtils.randomInt(4, 5.9)); // outputs 0
 *      console.log(myUtils.randomInt(4, 3)); // outputs 4
 * @method randomInt
 * @param {number} max a positive integer representing the upper limit of a range.
 * @param {number} min a positive integer representing the lower limit of a range.
 * @return {number}
 */
Utils.prototype.randomInt = function (min, max) {
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
};


/**
 * Returns the current date in year-month-day format.
 * @method currentDate
 * @return {string} returns the current date in year-month-day format.
 * @since 1.0.0
 */
Utils.prototype.currentDate = function () {
    const now = new Date(Date.now());

    let day = '';
    if(now.getDate() <= 9){
        day = "0" + now.getDate();
    }else{
        day = "" + now.getDate();
    }

    let month = '';
    const monthInt = now.getMonth() + 1;
    if(monthInt <= 9){
        month = "0" + monthInt;
    }else{
        month = "" + monthInt;
    }

    return now.getFullYear() + '-' + month + '-' + day;
};


/**
 * This method returns the current time.
 * @method currentTime
 * @return {String} returns the current time in hours:minutes:seconds format.
 * @since 1.0.0
 */
Utils.prototype.currentTime = function () {
    const now = new Date(Date.now());

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    let time = '';

    if(hours <= 9){
        time = '0' + hours;
    }else{
        time = '' + hours;
    }

    if(minutes <= 9){
        time += ':0' + minutes;
    }else{
        time += ':' + minutes;
    }

    if(seconds <= 9){
        time += ':0' + seconds;
    }else{
        time += ':' + seconds;
    }

    return time;
};


/**
 * This method concantenate the current date and time, by calling currentDate and currentTine methods.
 * @method currentDateTime
 * @return {String} returns the current date and time concantenated in a single string. The string is in the format
 * current_date current_time.
 * @since 1.0.0
 */
Utils.prototype.currentDateTime = function(){
    return this.currentDate() + " "  + this.currentTime();
};


/**
 * Returns true if a message was logged into logs/log.txt; if the file does not exist, it's created and the message logged into it.
 * It returns false if the message was not logged.
 * It throws an exception (with a message **Failed to create logs folder**) if it the logs folder couldn't be created.
 * @method writeToLog
 * @param {string|Error} msg a message to log.
 * @return {boolean}
 */
Utils.prototype.writeToLog = async function (msg) {
    let finalMsg;
    const thisObjt = this;

    let filename = "log.txt";

    if (msg instanceof Error) {
        finalMsg =  msg.stack;
    } else {
        finalMsg = msg + "";
    }


    const pathParts = __dirname.split(path.sep);
    const lastDir = pathParts[pathParts.length - 1];
    const rootPath = __dirname.replace(lastDir, "");
    const logsFolderPath = rootPath + "logs";

    if (! fs.existsSync(logsFolderPath)) {
        try {
            await fsPromises.mkdir(logsFolderPath);
        } catch (error) {
            throw new Error("Failed to create logs folder");
        }
    }

    const logFileFullPath = logsFolderPath + path.sep + filename;
    const loggedMsg = "[" + thisObjt.currentDateTime() +  "] " + finalMsg + "\n";

    try {
        await fsPromises.appendFile(logFileFullPath, loggedMsg, "utf8");
        return true;
    } catch (error) {
        return false;
    }
};


/**
 * This function blocks the execution for a number of milliseconds.
 * @param {Number} sleepingTime an integer representing the duration of sleep.
 * @returns {Promise<any>}
 */
Utils.prototype.sleep = function (sleepingTime) {
    return new Promise(function (resolve) {
        if (! Number.isInteger(sleepingTime)) {
            resolve(true);
            return;
        }

        const intervalId = timers.setInterval(function () {
            timers.clearInterval(intervalId);
            resolve(true);
        }, sleepingTime);
    });
};


Utils.prototype.readFile = async function (filePath, options = {encoding: 'utf8'}) {
    let result = '';
    let mainError = null;
    let fileHandle;

    try {
        fileHandle = await fsPromises.open(filePath, 'r').catch(async function (oError) {
            mainError = oError;
        });

        if (typeof fileHandle !== 'undefined') {
            await fileHandle.readFile(options).then(function (data) {
                result = data;
            }).catch(function (rError) {
                mainError = rError;
            });
        } else {
            mainError = new Error("Failed to open file : " + filePath);
        }
    } catch (error) {
        mainError = error
    } finally {
        if (typeof fileHandle !== 'undefined') {
            await fileHandle.close();
        }
    }


    if (mainError !== null)
        throw mainError;

    return result;
};

Utils.prototype.writeFile = async function (filePath, data) {
    let result = '';
    let mainError = null;
    let fileHandle;

    if (fs.existsSync(filePath)) {
        try {
            fileHandle = await fsPromises.open(filePath, 'w+').catch(async function (oError) {
                mainError = oError;
            });

            await fileHandle.writeFile(data).catch(async function (wError) {
                mainError = wError;
            });
        } catch (error) {
            mainError = error
        } finally {
            if (fileHandle !== undefined)
                await fileHandle.close();
        }
    } else {
        await fsPromises.appendFile(filePath, data).catch(function (wError) {
            mainError = wError;
        });
    }



    if (mainError !== null)
        throw mainError;

    return result;
};

Utils.prototype.unzip = function (bufferedData, options = {}) {
    return new Promise(function (resolve, reject) {
        internalHelpers.decompressData(bufferedData, zlib.createUnzip(), resolve, reject);
    });
};

Utils.prototype.inflate = function (bufferedData, options = {flush: zlib.constants.Z_PARTIAL_FLUSH}) {
    return new Promise(function (resolve, reject) {
        internalHelpers.decompressData(bufferedData, zlib.createInflate(), resolve, reject);
    });
};

Utils.prototype.inflateRaw = function (bufferedData, options = {}) {
    return new Promise(function (resolve, reject) {
        internalHelpers.decompressData(bufferedData, zlib.createInflateRaw(), resolve, reject);
    });
};

Utils.prototype.gunzip = function (bufferedData, options = {}) {
    return new Promise(function (resolve, reject) {
        internalHelpers.decompressData(bufferedData, zlib.createGunzip(), resolve, reject);
    });
};

Utils.prototype.brotliDecompress = function (bufferedData, options = {}) {
    return new Promise(function (resolve, reject) {
        internalHelpers.decompressData(bufferedData, zlib.createBrotliDecompress(), resolve, reject);
    });
};

Utils.prototype.isStaticRes = function (url) {

    return (url + '').match(/\.(css|json|js|text|png|jpg|map|ico|svg|mp3|mp4|txt|jfproj|etx|pfa|fnt|vlw|woff|fot|ttf|sfd|pfb|vfb|otf|gxf|odttf|woff2|pf2|bf|ttc|chr|bdf|fon)/i);
};