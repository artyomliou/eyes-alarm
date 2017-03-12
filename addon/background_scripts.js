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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
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
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        console.log(args.reduce(function (acc, val) {
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaultValues = __webpack_require__(4);
var storageKeys = ['isReading', 'passedMinutes', 'breakTimeAmount', 'readingTimeAmount', 'idleDetectionInterval'];

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
        }).catch(function (err) {
            console.error(err);
        });
    }
};

module.exports = storage;

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    isReading: true,
    passedMinutes: 0,
    breakTimeAmount: 10,
    readingTimeAmount: 50,
    idleDetectionInterval: 1200
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var storage = __webpack_require__(2);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var paths = __webpack_require__(14);
var storage = __webpack_require__(2);

var noticeParams = {
    type: 'basic',
    iconUrl: browser.extension.getURL(paths.notificationIcon),
    title: browser.i18n.getMessage("notificationTitle"),
    message: browser.i18n.getMessage("notificationContent")
};

var notificationID = 'eyes-alarm-n';

var ui = {
    icon: {
        switch: function _switch(isGreen) {}
    },
    notice: {
        create: function create() {
            browser.notifications.create(notificationID, noticeParams);
        },
        clear: function clear() {
            browser.notifications.clear(notificationID);
        }
    },
    clock: {
        switch: function _switch(isGreen) {
            storage.store.isReading = isGreen;
        },
        sync: function sync() {
            if (browser.extension.getViews({ type: "popup" }).length) {
                browser.runtime.sendMessage({
                    time: storage.store.passedMinutes,
                    reading: storage.store.isReading
                }).catch(function (err) {
                    console.error(err);
                });
            }
        }
    }
};

module.exports = ui;

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ui = __webpack_require__(7);
var clock = __webpack_require__(5);
var counter = __webpack_require__(6);

var isLocked = false;

var idle = {
    init: function init(val) {
        browser.idle.setDetectionInterval(val);
    },

    detect: {
        start: function start() {
            browser.idle.onStateChanged.addListener(idle.dispatch);
        },
        stop: function stop() {
            browser.idle.onStateChanged.removeListener(idle.dispatch);
        }
    },
    dispatch: function dispatch(state) {
        switch (state) {
            case 'active':
                if (isLocked) {
                    counter.start();
                    ui.icon.switch(true);
                    ui.clock.switch(true);
                    ui.clock.sync();
                    isLocked = false;
                }
                break;
            case 'idle':
            case 'locked':
                counter.stop();
                ui.notice.clear();
                isLocked = true;
                break;
        }
    }
};

module.exports = idle;

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var paths = {
    greenButton: "icons/set-timer-button.png",
    redButton: "icons/set-timer-button-red.png",
    notificationIcon: "icons/icon-pad@128.png",
    coloredButton: "icons/icon@128.png"
};

module.exports = paths;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    handleResponse = _require.handleResponse;

var ui = __webpack_require__(7);
var idle = __webpack_require__(9);
var clock = __webpack_require__(5);
var counter = __webpack_require__(6);
var storage = __webpack_require__(2);

function resetUI(iconIsGreen) {
    clock.reset();
    ui.icon.switch(iconIsGreen);
    ui.clock.switch(iconIsGreen);
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
}

browser.alarms.onAlarm.addListener(function (alarm) {
    updateClock();
    if (shouldBreak()) {
        counter.restart();
        resetUI(false);
        ui.notice.create();
    } else if (shouldRead()) {
        counter.restart();
        resetUI(true);
    }
});

function timeResponse() {
    return {
        time: storage.store.passedMinutes,
        reading: storage.store.isReading
    };
}
browser.runtime.onMessage.addListener(function (request, sender) {
    switch (request.type) {

        case 'requestTime':
            return Promise.resolve(timeResponse());

        case 'resetCounter':
            counter.restart();
            resetUI(true);
            return Promise.resolve(timeResponse());
    }
});

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

storage.load({
    callback: function callback() {
        idle.init(storage.store.idleDetectionInterval);
        idle.detect.start();
        counter.start();
    }
});

/***/ })
/******/ ]);