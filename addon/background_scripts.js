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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var defaultValues = __webpack_require__(2);

var storageKeys = ['isReading', 'passedMinutes', 'breakTimeAmount', 'readingTimeAmount', 'idleDetectionInterval', 'soundEnabled', 'soundPath'];
var storage = {
  store: {},
  load: function load(_ref) {
    var callback = _ref.callback,
        params = _ref.params;
    browser.storage.local.get(null).then(function (result) {
      storageKeys.forEach(function (key) {
        storage.store[key] = result[key] || defaultValues[key];
      });

      if (callback) {
        callback(params);
      }
    })["catch"](function (err) {
      console.error(err);
    });
  }
};
module.exports = storage;

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var storage = __webpack_require__(3);

var timePacket = __webpack_require__(6);

var _require = __webpack_require__(7),
    audioElement = _require.audioElement,
    defaultSoundPath = _require.defaultSoundPath;

var paths = __webpack_require__(13);

var defaultValues = __webpack_require__(2);

var notificationParams = {
  type: 'basic',
  iconUrl: browser.extension.getURL(paths.notificationIcon),
  title: defaultValues.title,
  message: defaultValues.message
};
var notificationID = 'eyes-alarm-n';
var ui = {
  icon: {
    /**
     * once used to change the color of clock inside popup
     * @param {Boolean} isGreen 
     */
    "switch": function _switch(isGreen) {
      /*
      let path = isGreen ? paths.greenButton : paths.redButton
      browser.browserAction.setIcon({ path })
      */
    }
  },
  notice: {
    /**
     * check some custom data if they existed
     * and passed them to callback for futher process
     * @param {Array} keys 
     * @param {Function} callback 
     */
    checkCustomDataExists: function checkCustomDataExists(keys, callback) {
      browser.storage.local.get(keys).then(function (result) {
        callback(keys, result);
      });
    },

    /**
     * check if there it's some custom data to rewrite parameters used for showing notifiation
     * then check again, but this time is for playing sound
     */
    create: function create() {
      ui.notice.checkCustomDataExists(['title', 'message'], function (keys, result) {
        // rewrite data for creating notification
        keys.forEach(function (key) {
          if (result[key]) {
            notificationParams[key] = result[key];
          }
        }); // creating

        browser.notifications.create(notificationID, notificationParams);
      });
      ui.notice.checkCustomDataExists(['soundEnabled', 'soundPath', 'soundVolume'], function (keys, result) {
        if (result.soundEnabled) {
          ui.sound.play(result.soundPath, result.soundVolume);
        }
      });
    },

    /**
     * close notifcation
     */
    clear: function clear() {
      browser.notifications.clear(notificationID);
    }
  },
  clock: {
    /**
     * change storage.store.isReading
     * for indicating whether it's at reading mode
     * @param {Boolean} isGreen 
     */
    "switch": function _switch(isGreen) {
      storage.store.isReading = isGreen;
    },

    /**
     * send time to popup from background_script
     */
    sync: function sync() {
      if (browser.extension.getViews({
        type: "popup"
      }).length) {
        browser.runtime.sendMessage(timePacket())["catch"](function (err) {
          console.error(err);
        });
      }
    }
  },
  sound: {
    /**
     * if user doesnt specify the path to play, play default one
     * if user specified a path, play it
     * @param {String} path 
     */
    updatePath: function updatePath() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (path) {
        if (audioElement.src !== path) {
          audioElement.src = path;
        }
      } else if (audioElement.src !== defaultSoundPath) {
        audioElement.src = defaultSoundPath;
      }
    },

    /**
     * set path and volume
     * then play
     * @param {String} path 
     */
    play: function play(path, volume) {
      try {
        ui.sound.updatePath(path);
        audioElement.volume = volume;
        audioElement.play();
      } catch (err) {
        console.error(err);
        console.log(audioElement);
      }
    }
  }
};
module.exports = ui;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var storage = __webpack_require__(3);

var timePacket = function timePacket() {
  return {
    time: storage.store.passedMinutes,
    limit: storage.store.isReading ? storage.store.readingTimeAmount : storage.store.breakTimeAmount,
    reading: storage.store.isReading
  };
};

module.exports = timePacket;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var defaultSoundPath = __webpack_require__(12);

var audioElement = new Audio(defaultSoundPath);
audioElement.preload = true;
audioElement.loop = false;
module.exports = {
  audioElement: audioElement,
  defaultSoundPath: defaultSoundPath
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var storage = __webpack_require__(3);

var clock = {
  reset: function reset() {
    storage.store.passedMinutes = 0;
  },
  plus: function plus(number) {
    storage.store.passedMinutes += number;
  }
};
module.exports = clock;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var counter = {
  start: function start() {
    browser.alarms.create('eyes-alarm-counter', {
      periodInMinutes: 1
    });
  },
  stop: function stop() {
    browser.alarms.clear('eyes-alarm-counter');
  },
  restart: function restart() {
    counter.stop();
    counter.start();
  }
};
module.exports = counter;

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(0),
    handleResponse = _require.handleResponse;

var ui = __webpack_require__(5);

var idle = __webpack_require__(14);

var clock = __webpack_require__(8);

var counter = __webpack_require__(9);

var storage = __webpack_require__(3);

var timePacket = __webpack_require__(6);
/**
 *  callbacks
 */


function resetUI(iconIsGreen) {
  clock.reset(); //ui.icon.switch(iconIsGreen)

  ui.clock["switch"](iconIsGreen);
  ui.clock.sync();
}

function shouldRead() {
  return !storage.store.isReading && storage.store.passedMinutes >= storage.store.breakTimeAmount;
}

function shouldBreak() {
  return storage.store.isReading && storage.store.passedMinutes >= storage.store.readingTimeAmount;
}

function updateClock() {
  clock.plus(1);
  ui.clock.sync();
} // dispatch alarm event


browser.alarms.onAlarm.addListener(function (alarm) {
  updateClock();

  if (shouldBreak()) {
    counter.restart();
    resetUI(false); // turn to red

    ui.notice.create();
  } else if (shouldRead()) {
    counter.restart();
    resetUI(true); // turn to green
  }
}); // start dispatch request

browser.runtime.onMessage.addListener(function (request, sender) {
  switch (request.type) {
    case 'requestTime':
      return Promise.resolve(timePacket());

    case 'resetCounter':
      counter.restart();
      resetUI(true);
      return Promise.resolve(timePacket());
  }
}); // reset alarms when setting changes

browser.storage.onChanged.addListener(function (changes, area) {
  if (area === 'local') {
    storage.load({
      callback: function callback() {
        counter.restart();
        resetUI(true);
      }
    });
  }
});
/**
 *  business logic
 */

storage.load({
  callback: function callback() {
    idle.init(storage.store.idleDetectionInterval);
    idle.detect.start();
    counter.start();
  }
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a5d97ad536ac3f7b1accf037828bafed.wav";

/***/ }),
/* 13 */
/***/ (function(module, exports) {

var paths = {
  greenButton: "icons/set-timer-button.png",
  redButton: "icons/set-timer-button-red.png",
  notificationIcon: "icons/icon-pad@128.png",
  coloredButton: "icons/icon@128.png"
};
module.exports = paths;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var ui = __webpack_require__(5);

var clock = __webpack_require__(8);

var counter = __webpack_require__(9);

var audioElement = __webpack_require__(7);

var isLocked = false;
var idle = {
  init: function init(val) {
    browser.idle.setDetectionInterval(val);
  },
  detect: {
    start: function start() {
      browser.idle.onStateChanged.addListener(idle.dispatch);
    }
  },
  dispatch: function dispatch(state) {
    switch (state) {
      case 'active':
        if (isLocked) {
          audioElement.muted = false;
          counter.start(); //ui.icon.switch(true)

          ui.clock["switch"](true);
          ui.clock.sync();
          isLocked = false;
        }

        break;

      case 'idle':
      case 'locked':
        audioElement.muted = true;
        counter.stop();
        ui.notice.clear();
        clock.reset();
        isLocked = true;
        break;
    }
  }
};
module.exports = idle;

/***/ })
/******/ ]);