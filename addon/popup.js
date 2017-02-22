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


var _require = __webpack_require__(2),
    getLocalString = _require.getLocalString;

var extensionName = getLocalString("extensionName");
var TAG = '[' + extensionName + '] ';
var eventTAG = '[event] ';
module.exports = {
    TAG: TAG,
    eventTAG: eventTAG
};

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(2),
    handleError = _require.handleError,
    formatTime = _require.formatTime;

var clock = {
    dom: null,
    reversed: false,
    request: function request() {
        browser.runtime.sendMessage({ type: 'requestTime' }).then(clock.ui.update, handleError);
    },
    reset: function reset() {
        browser.runtime.sendMessage({ type: 'resetCounter' }).then(clock.ui.update, handleError);
    },

    ui: {
        locate: function locate() {
            if (!clock.dom) {
                clock.dom = document.querySelector(".item.time");
            }
        },
        update: function update(msg) {
            clock.ui.locate();
            clock.dom.innerHTML = formatTime(msg.time);

            if (clock.reversed !== msg.reversed) {
                clock.dom.classList.toggle('warning', clock.reversed = msg.reversed);
            }
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

var _require = __webpack_require__(0),
    TAG = _require.TAG,
    eventTAG = _require.eventTAG;

var clock = __webpack_require__(11);

/**
 *  window event
 */
window.onload = function () {
    browser.runtime.onMessage.addListener(clock.ui.update);
    clock.request();

    document.querySelector('#refresh_button').addEventListener('click', clock.reset);

    document.querySelector('#options_button').addEventListener('click', function (e) {
        e.preventDefault();
        browser.runtime.openOptionsPage();
    });
};

window.onunload = function () {
    browser.runtime.onMessage.removeListener(clock.ui.update);
};

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function handleError(err) {
    console.error(err);
}

function toTitleCase(word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
}

function getLocalString(key) {
    return browser.i18n.getMessage(key);
}

function formatTime(time) {
    var s = [];
    for (var key in time) {
        if (time.hasOwnProperty(key)) {
            if (key === 'days' && time[key] === 0) {
                continue;
            }
            var prefix = time[key] >= 10 ? '' : '0';
            s.push(prefix + time[key]);
        }
    }
    return s.join(':');
}

module.exports = {
    handleError: handleError,
    toTitleCase: toTitleCase,
    getLocalString: getLocalString,
    formatTime: formatTime
};

/***/ })

/******/ });