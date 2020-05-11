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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports) {

module.exports = {
  debugMode: true
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
  isReading: true,
  passedMinutes: 0,
  breakTimeAmount: 10,
  readingTimeAmount: 50,
  idleDetectionInterval: 1200,
  title: browser.i18n.getMessage("notificationTitle"),
  message: browser.i18n.getMessage("notificationMessage"),
  soundEnabled: false,
  soundPath: '',
  soundVolume: 0.5
};

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

var nodes = {
  pool: {},

  /**
   * return specified dom
   * if it doesnt exist in pool, get it and cache it in pool
   * @param {*} key 
   */
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
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(0),
    toTitleCase = _require.toTitleCase,
    getLocalString = _require.getLocalString;

var defaultValues = __webpack_require__(2);

var nodes = __webpack_require__(4); // used to map a DOM's key to the locallized string
// to render the options page


var reflect = {
  // [dom key]: [locale string key]
  readingTime_label: 'optionsWorkTimeLabel',
  breakTime_label: 'optionsBreakTimeLabel',
  title_label: 'optionsNotificationTitleLabel',
  message_label: 'optionsNotificationMessageLabel',
  soundEnabled_label: 'optionsSoundEnabledLabel',
  soundVolume_label: 'optionsSoundVolumeLabel',
  soundPath_label: 'optionsSoundPathLabel',
  apply: 'optionsApplyButton',
  reset: 'optionsResetButton'
}; // used to retrieve data from specified nodes

var storageKeys = ['breakTimeAmount', 'readingTimeAmount', 'title', 'message', 'soundEnabled', 'soundPath', 'soundVolume'];
var page = {
  render: function render() {
    page.labels.set();
    page.inputs.set();
  },
  labels: {
    sound: {
      volume: {
        /**
         * render volume's label
         * @param {Event} e 
         */
        set: function set() {
          var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
          var value = e === null ? nodes.getDOM('soundVolume').value : e.target.value;
          nodes.getDOM('soundVolumeValue').innerText = "".concat(value * 100, "%");
        }
      }
    },

    /**
     * render all labels
     */
    set: function set() {
      for (var key in reflect) {
        nodes.getDOM(key).innerText = getLocalString(reflect[key]);
      }
    }
  },
  inputs: {
    sound: {
      /**
       * switch status whether sound-related columns is disabled
       * @param {Event} e 
       */
      toggleEditable: function toggleEditable() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var disabled = false;
        var switchList = ['soundPath', 'soundVolume'];

        if (e === null) {
          disabled = !nodes.getDOM('soundEnabled').checked;
        } else {
          disabled = !e.target.checked;
        }

        switchList.forEach(function (key) {
          nodes.getDOM(key).disabled = disabled;
        });
      }
    },

    /**
     * Retrieve all data from local storage,
     * and render them into columns with special process depending on its type.
     * When there's no such value by specified key in storage,
     * use default values instead.
     */
    set: function set() {
      browser.storage.local.get(storageKeys).then(function (result) {
        storageKeys.forEach(function (key) {
          var node = nodes.getDOM(key);
          var value = result[key] || defaultValues[key];

          switch (node.type) {
            case 'checkbox':
              nodes.getDOM(key).checked = value;
              break;

            default:
              nodes.getDOM(key).value = value;
              break;
          }
        }); // display current sound volume

        page.labels.sound.volume.set(); // toggle columns related to custom-sound editable or not

        page.inputs.sound.toggleEditable();
      })["catch"](function (err) {
        console.error(err);
      });
    },

    /**
     * get all data specified by storageKeys,
     * append a timestamp(last_modified) for always updating value against browser's mechanism
     */
    get: function get() {
      var set = {
        last_modified: new Date().toLocaleTimeString()
      };
      storageKeys.forEach(function (key) {
        var node = nodes.getDOM(key);
        var attrs = node.attributes;

        if (attrs.type) {
          switch (attrs.type.value) {
            case 'number':
            case 'range':
              set[key] = node.valueAsNumber;
              break;

            case 'checkbox':
              set[key] = node.checked;
              break;

            default:
              set[key] = node.value;
              break;
          }
        } else {
          set[key] = node.value;
        }
      });
      return set;
    },

    /**
     * return a list filled with nodes specified by storageKeys
     */
    dom: function dom() {
      return Array.from(storageKeys.map(function (key) {
        return nodes.getDOM(key);
      }));
    }
  },
  button: {
    loading: {
      /**
       * toggle loading animation for Apply button
       * @param {Boolean} isLoading 
       */
      toggle: function toggle() {
        var isLoading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        nodes.getDOM('apply').classList.toggle('is-loading', isLoading);
      },

      /**
       * generate callback to turn on/off loading animation
       * @param {Boolean} isLoading 
       */
      toggleFactory: function toggleFactory(isLoading) {
        return function () {
          nodes.getDOM('apply').classList.toggle('is-loading', isLoading);
        };
      }
    }
  }
};
module.exports = page;

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(19);

var options = __webpack_require__(20);

var page = __webpack_require__(10);

var nodes = __webpack_require__(4);

document.addEventListener("DOMContentLoaded", page.render);
nodes.getDOM("apply").addEventListener("click", options.save);
nodes.getDOM("reset").addEventListener("click", options.reset);
nodes.getDOM("soundEnabled").addEventListener("click", page.inputs.sound.toggleEditable);
nodes.getDOM("soundVolume").addEventListener("change", page.labels.sound.volume.set);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(0),
    getLocalString = _require.getLocalString;

var page = __webpack_require__(10);

var nodes = __webpack_require__(4);

var defaultValues = __webpack_require__(2);

var options = {
  /**
   * gather data from all specified columns
   * (specify by storageKeys of page.js)
   * then save them
   * @param {Event} e 
   */
  save: function save(e) {
    page.button.loading.toggle(true); // animation

    e.preventDefault();
    var data = page.inputs.get();
    var dom = page.inputs.dom();
    var timestamp = "[".concat(data.last_modified, "] ");
    var stopLoadingAnimation = page.button.loading.toggleFactory(false);

    if (options.checkInputErrorExists(dom)) {
      options.msg('', false);
      return;
    }

    options.apply(timestamp, data, stopLoadingAnimation, stopLoadingAnimation);
  },

  /**
   * 重設所有欄位
   * @param {Event} e 
   */
  reset: function reset(e) {
    var _defaultValues;

    e.preventDefault();
    var data = (_defaultValues = defaultValues, title = _defaultValues.title, message = _defaultValues.message, breakTimeAmount = _defaultValues.breakTimeAmount, readingTimeAmount = _defaultValues.readingTimeAmount, _defaultValues);
    var timestamp = data.last_modified = new Date().toLocaleTimeString();
    options.apply(timestamp, data, function updateOptionsInputs() {
      page.inputs.set();
    });
  },

  /**
   * 根據input type 檢查資料是否合乎要求
   * @param {*} dom 
   */
  checkInputErrorExists: function checkInputErrorExists(dom) {
    return dom.map(function (el) {
      if (el.attributes.type && el.attributes.type.value === "number") {
        return el.validity.rangeOverflow || el.validity.rangeUnderflow; // returning True means that something is wrong
      } else {
          return false; // so return False when checking a non-number input
        }
    }).filter(function (el) {
      return el;
    }).length;
  },

  /**
   * save data into local storage
   * @param {String} timestamp 
   * @param {Object} data 
   * @param {Function} successCallback 
   * @param {Function} failCallback
   */
  apply: function apply(timestamp, data) {
    var successCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var failCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
    browser.storage.local.set(data).then(function () {
      options.msg(timestamp + getLocalString('optionsApplySuccessMessage'), true);
      successCallback && successCallback();
    })["catch"](function (err) {
      options.msg(timestamp + err.message, false);
      failCallback && failCallback();
    });
  },
  msg: function msg(text, isSuccess) {
    var n = nodes.getDOM('msg');
    n.innerText = text;
    n.classList.toggle('success', isSuccess);
    n.classList.toggle('warning', !isSuccess);
  }
};
module.exports = options;

/***/ })
/******/ ]);