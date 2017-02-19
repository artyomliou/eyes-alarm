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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TAG = '[' + browser.i18n.getMessage("extensionName") + '] ';
var eventTAG = '[event] ';
module.exports = {
    TAG: TAG,
    eventTAG: eventTAG
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function handleError(err) {
    console.error(err);
}

module.exports = {
    handleError: handleError
};

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    handleError = _require.handleError;

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

var clock = {
    dom: null,
    reversed: false,
    locate: function locate() {
        clock.dom = document.querySelector(".item.time");
    },
    update: function update(msg) {
        clock.dom.innerHTML = formatTime(msg.time);

        if (clock.reversed !== msg.reversed) {
            clock.dom.classList.toggle('warning', clock.reversed = msg.reversed);
        }
        return true;
    },
    request: function request() {
        browser.runtime.sendMessage({ type: 'requestTime' }).then(clock.update, handleError);
    },
    reset: function reset() {
        browser.runtime.sendMessage({ type: 'resetCounter' }).then(clock.update, handleError);
    }
};

module.exports = clock;

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(10);

var _require = __webpack_require__(0),
    TAG = _require.TAG,
    eventTAG = _require.eventTAG;

var clock = __webpack_require__(8);

/**
 *  window event
 */
window.onload = function () {
    clock.locate();
    clock.request();
    browser.runtime.onMessage.addListener(clock.update);
};

window.onunload = function () {
    browser.runtime.onMessage.removeListener(clock.update);
};

document.querySelector('#refresh_button').addEventListener('click', clock.reset);

document.querySelector('#options_button').addEventListener('click', function (e) {
    e.preventDefault();
    browser.runtime.openOptionsPage();
});

/***/ })
/******/ ]);