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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    debugMode: true
};

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nodes = {
    pool: {},
    getDOM: function getDOM(key) {
        if (nodes.pool.hasOwnProperty(key)) {
            return nodes.pool[key];
        } else {
            return nodes.pool[key] = document.querySelector('#' + key);
        }
    }
};

module.exports = nodes;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    isReading: true,
    passedMinutes: 0,
    breakTimeAmount: 10,
    readingTimeAmount: 50,
    idleDetectionInterval: 600
};

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    toTitleCase = _require.toTitleCase,
    getLocalString = _require.getLocalString;

var defaultValues = __webpack_require__(4);
var nodes = __webpack_require__(3);

var reflect = {
    readingTime_label: 'optionsWorkTimeLabel',
    breakTime_label: 'optionsBreakTimeLabel',
    apply: 'optionsApplyButton',
    apply_msg: 'optionsApplySuccessMessage'
};
var storageKeys = ['breakTimeAmount', 'readingTimeAmount'];

var page = {
    render: function render() {
        browser.storage.local.get(storageKeys).then(page.inputs.set, function (err) {
            console.error(err);
        });

        for (var key in reflect) {
            nodes.getDOM(key).innerText = getLocalString(reflect[key]);
        }
    },

    inputs: {
        set: function set(result) {
            storageKeys.forEach(function (key) {
                nodes.getDOM(key).value = result[key] || defaultValues[key];
            });
        },
        get: function get() {
            var set = {};
            storageKeys.forEach(function (key) {
                set[key] = parseInt(nodes.getDOM(key).value);
            });
            return set;
        }
    }
};

module.exports = page;

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var page = __webpack_require__(8);
var nodes = __webpack_require__(3);

var options = {
    dom: {},

    save: function save(e) {
        e.preventDefault();
        try {
            browser.storage.local.set(page.inputs.get());
            nodes.getDOM('apply_msg').classList.toggle('hidden', false);
            nodes.getDOM('error_msg').innerText = '';
        } catch (e) {
            nodes.getDOM('apply_msg').classList.toggle('hidden', true);
            nodes.getDOM('error_msg').innerText += e.message;
        }
    }
};

module.exports = options;

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(12);
var options = __webpack_require__(10);
var page = __webpack_require__(8);
var nodes = __webpack_require__(3);

document.addEventListener("DOMContentLoaded", page.render);
nodes.getDOM("apply").addEventListener("click", options.save);

/***/ })
/******/ ]);