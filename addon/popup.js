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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

var env = __webpack_require__(1);

function handleResponse(r) {
  console.info(r);
}

function log() {
  if (env.debugMode) {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    console.log(args.reduce(function (acc, val) {
      return acc + val;
    }, ''));
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
    console.error("input time [".concat(minutes, "] is not integer"));
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
/**
 * accept a number
 * if it's less than 10, pad it with zero
 * @param {Number} val 
 */


function padTime(val) {
  return val < 10 ? "0".concat(val) : val;
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
/***/ (function(module, exports) {

module.exports = {
  debugMode: true
};

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(16);

var clock = __webpack_require__(17);

document.querySelector('#refresh_button').addEventListener('click', clock.reset);
document.querySelector('#options_button').addEventListener('click', function (e) {
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

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = __webpack_require__(0),
    formatTime = _require.formatTime;

var clock = {
  dom: null,
  request: function request() {
    browser.runtime.sendMessage({
      type: 'requestTime'
    }).then(clock.update)["catch"](function (err) {
      console.error(err);
    });
  },
  reset: function reset() {
    browser.runtime.sendMessage({
      type: 'resetCounter'
    }).then(clock.update)["catch"](function (err) {
      console.error(err);
    });
  },
  update: function update(msg) {
    if (_typeof(msg) === 'object') {
      if (!clock.dom) {
        clock.dom = document.querySelector("#monitor");
      }

      var remain = msg.limit - msg.time;
      clock.dom.innerText = formatTime(remain);
      clock.dom.classList.toggle('warning', !msg.reading);
    }

    return true;
  }
};
module.exports = clock;

/***/ })

/******/ });