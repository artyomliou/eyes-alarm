/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

const env = __webpack_require__(2);

function handleResponse(r) {
    console.info(r);
}

function log(...args) {
    if (env.debugMode) {
        console.log(args.reduce((acc, val) => acc + val, ''));
    }
}

/**
 * baNANA => Banana
 * @param {String} word 
 */
function toTitleCase(word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
}

/**
 * retrieve localized string
 * @param {String} key 
 */
function getLocalString(key) {
    return browser.i18n.getMessage(key);
}

/**
 * format time to [12:00] style
 * @param {Number} minutes 
 */
function formatTime(minutes) {
    if (!Number.isInteger(minutes)) {
        console.error(`input time [${minutes}] is not integer`);
        return 'ERROR';
    }
    let formatted = [];
    let hour = 0;
    if (minutes >= 60) {
        do {
            minutes -= 60;
            hour += 1;
        } while (minutes >= 60);
    }
    formatted.push(hour, minutes);
    return formatted.map(el => padTime(el)).join(':');
}

/**
 * accept a number
 * if it's less than 10, pad it with zero
 * @param {Number} val 
 */
function padTime(val) {
    return val < 10 ? `0${val}` : val;
}

module.exports = {
    handleResponse,
    toTitleCase,
    getLocalString,
    log,
    formatTime
};

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

const { formatTime } = __webpack_require__(0);

var clock = {
    dom: null,
    request() {
        browser.runtime.sendMessage({ type: 'requestTime' }).then(clock.update).catch(err => {
            console.error(err);
        });
    },
    reset() {
        browser.runtime.sendMessage({ type: 'resetCounter' }).then(clock.update).catch(err => {
            console.error(err);
        });
    },

    update(msg) {
        if (typeof msg === 'object') {
            if (!clock.dom) {
                clock.dom = document.querySelector("#monitor");
            }
            let remain = msg.limit - msg.time;
            clock.dom.innerText = formatTime(remain);
            clock.dom.classList.toggle('warning', !msg.reading);
        }
        return true;
    }
};

module.exports = clock;

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(15);
var clock = __webpack_require__(13);

document.querySelector('#refresh_button').addEventListener('click', clock.reset);

document.querySelector('#options_button').addEventListener('click', e => {
    e.preventDefault();
    browser.runtime.openOptionsPage();
});

window.addEventListener("load", function (event) {
    browser.runtime.onMessage.addListener(clock.update);
    clock.request();
});

window.addEventListener("unload", function (event) {
    browser.runtime.onMessage.removeListener(clock.update);
});

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = {
    debugMode: true
};

/***/ })

/******/ });