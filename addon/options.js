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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _defaultValues;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var workTimeKey = 'work_time';
var breakTimeKey = 'break_time';
var keys = [workTimeKey, breakTimeKey];

var defaultValues = (_defaultValues = {}, _defineProperty(_defaultValues, workTimeKey, 50), _defineProperty(_defaultValues, breakTimeKey, 10), _defaultValues);

module.exports = {
    workTimeKey: workTimeKey,
    breakTimeKey: breakTimeKey,
    keys: keys,
    defaultValues: defaultValues
};

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

var _require = __webpack_require__(0),
    TAG = _require.TAG;

var _require2 = __webpack_require__(3),
    keys = _require2.keys,
    defaultValues = _require2.defaultValues;

var _require3 = __webpack_require__(1),
    handleError = _require3.handleError;

var applyLabelKey = 'apply';
var optionsPrefix = 'options';
var labelPrefix = '#';
var labelSuffix = '_label';

/**
 *  callbacks
 */
function toTitleCase(word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
}

var page = {

    renderLocalLabels: function renderLocalLabels() {
        var copy = keys.slice();
        copy.push(applyLabelKey);

        copy.forEach(function (el) {
            var key = el + labelSuffix;
            var domKey = labelPrefix + key;
            var stringKey = optionsPrefix + key.split('_').map(toTitleCase).join('');

            var string = browser.i18n.getMessage(stringKey);
            document.querySelector(domKey).innerText = string;
        });
    },

    setColumns: function setColumns(result) {
        keys.forEach(function (key) {
            var val = '';
            if (result.hasOwnProperty(key) && result[key]) {
                val = result[key];
            } else {
                val = defaultValues[key];
            }
            document.querySelector("#" + key).value = val;
        });
    },

    getColumns: function getColumns() {
        var set = {};
        keys.forEach(function (key) {
            var val = document.querySelector("#" + key).value;
            set[key] = parseInt(val);
        });
        return set;
    }
};
var options = {
    TAG: '[options] ',

    restore: function restore() {
        console.log(TAG + options.TAG + 'restore...');
        browser.storage.local.get(keys).then(page.setColumns, handleError);
        page.renderLocalLabels();
    },

    save: function save(e) {
        e.preventDefault();
        console.log(TAG + options.TAG + 'save...');
        browser.storage.local.set(page.getColumns());
    }
};

/**
 *  event handler
 */
document.addEventListener("DOMContentLoaded", options.restore);
document.querySelector("form button").addEventListener("click", options.save);

/***/ })
/******/ ]);