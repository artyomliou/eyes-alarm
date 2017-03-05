/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var env = __webpack_require__(1);

function handleResponse(r) {
    console.info(r);
}

function toTitleCase(word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
}

function getLocalString(key) {
    return browser.i18n.getMessage(key);
}

function log() {
    if (env.debugMode) {
        console.log(arguments.reduce(function (acc, val) {
            return acc + val;
        }, ''));
    }
}

function formatTime(minutes) {
    if (!Number.isInteger(minutes)) {
        console.error('input time [' + minutes + '] is not integer');
        return 'ERROR';
    }
    var formatted = [];
    var hour = 0;
    if (minutes >= 60) {
        do {
            minutes -= 60;
            hour += 1;
        } while (minutes >= 60);
    }
    formatted.push(hour, minutes);
    return formatted.map(function (el) {
        return padTime(el);
    }).join(':');
}

function padTime(val) {
    return val < 10 ? '0' + val : val;
}

module.exports = {
    handleResponse: handleResponse,
    toTitleCase: toTitleCase,
    getLocalString: getLocalString,
    log: log,
    formatTime: formatTime
};

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    debugMode: true
};

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _require = __webpack_require__(0),
    formatTime = _require.formatTime;

var clock = {
    dom: null,
    request: function request() {
        browser.runtime.sendMessage({ type: 'requestTime' }).then(clock.update, function (err) {
            console.error(err);
        });
    },
    reset: function reset() {
        browser.runtime.sendMessage({ type: 'resetCounter' }).then(clock.update, function (err) {
            console.error(err);
        });
    },
    update: function update(msg) {
        if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) !== 'object') {
            return;
        } else {
            if (!clock.dom) {
                clock.dom = document.querySelector("#monitor");
            }
            clock.dom.innerText = formatTime(msg.time);
            clock.dom.classList.toggle('warning', !msg.reading);
            return true;
        }
    }
};

module.exports = clock;

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(13);
var clock = __webpack_require__(11);

window.onload = function () {
    browser.runtime.onMessage.addListener(clock.update);
    clock.request();

    document.querySelector('#refresh_button').addEventListener('click', clock.reset);

    document.querySelector('#options_button').addEventListener('click', function (e) {
        e.preventDefault();
        browser.runtime.openOptionsPage();
    });
};

window.onunload = function () {
    browser.runtime.onMessage.removeListener(clock.update);
};

/***/ })

/******/ });