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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alarmWork = {
    id: 'alarmWork',
    interval: 50
};
var alarmBreak = {
    id: 'alarmBreak',
    interval: 10
};
var alarmCounter = {
    id: 'alarmCounter',
    interval: 1
};

/*
const alarmClockUpdate = {
    id: 'alarmClockUpdate',
    interval: 1
}
*/
var alarmKeys = [alarmWork.id, alarmBreak.id];

module.exports = {
    alarmWork: alarmWork,
    alarmBreak: alarmBreak,
    alarmCounter: alarmCounter,
    alarmKeys: alarmKeys
};

/***/ }),
/* 2 */
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

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    TAG = _require.TAG;

var _require2 = __webpack_require__(1),
    alarmKeys = _require2.alarmKeys,
    getLocalString = _require2.getLocalString;

var page = __webpack_require__(14);

var options = {
    TAG: '[options] ',
    dom: {},

    getDOM: function getDOM(key) {
        if (options.dom.hasOwnProperty(key)) {
            return options.dom[key];
        } else {
            return options.dom[key] = document.querySelector(key);
        }
    },
    save: function save(e) {
        e.preventDefault();
        console.log(TAG + options.TAG + 'save...');
        try {
            browser.storage.local.set(page.columns.get());
            options.getDOM('#apply_msg').classList.toggle('hidden', false);
        } catch (e) {
            options.getDOM('#apply_msg').classList.toggle('hidden', true);
            options.getDOM('#error_msg').innerText += e.message;
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    TAG = _require.TAG;

var _require2 = __webpack_require__(2),
    toTitleCase = _require2.toTitleCase,
    getLocalString = _require2.getLocalString,
    handleError = _require2.handleError;

var _require3 = __webpack_require__(1),
    alarmWork = _require3.alarmWork,
    alarmBreak = _require3.alarmBreak,
    alarmKeys = _require3.alarmKeys;

function getInterval(key) {
    switch (key) {
        case alarmWork.id:
            return alarmWork.interval;
        case alarmBreak.id:
            return alarmBreak.interval;
        default:
            return null;
    }
}

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

var page = {
    TAG: '[options] ',
    reflect: {
        alarmWork_label: 'WorkTimeLabel',
        alarmBreak_label: 'BreakTimeLabel',
        apply: 'ApplyButton',
        apply_msg: 'ApplySuccessMessage'
    },
    render: function render() {
        console.log(TAG + page.TAG + 'render...');
        browser.storage.local.get(alarmKeys).then(page.columns.set, handleError);

        Object.keys(page.reflect).forEach(function (key) {
            nodes.getDOM(key).innerText = getLocalString('options' + page.reflect[key]);
        });
    },

    columns: {
        pool: {},
        set: function set(result) {
            alarmKeys.forEach(function (key) {
                var val = result[key] || getInterval(key);
                if (val) {
                    nodes.getDOM(key).value = val;
                }
            });
        },
        get: function get() {
            var set = {};
            alarmKeys.forEach(function (key) {
                set[key] = parseInt(nodes.getDOM(key).value);
            });
            return set;
        }
    }
};

module.exports = page;

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(12);
var options = __webpack_require__(10);
var page = __webpack_require__(14);

document.addEventListener("DOMContentLoaded", page.render);
document.querySelector("#apply").addEventListener("click", options.save);

/***/ })
/******/ ]);