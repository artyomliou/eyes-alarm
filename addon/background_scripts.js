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


function handleError(err) {
    console.error(err);
}

function handleResponse(r) {
    console.info(r);
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
    handleResponse: handleResponse,
    handleError: handleError,
    toTitleCase: toTitleCase,
    getLocalString: getLocalString,
    formatTime: formatTime
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    getLocalString = _require.getLocalString;

var extensionName = getLocalString("extensionName");
var TAG = '[' + extensionName + '] ';
var eventTAG = '[event] ';
module.exports = {
    TAG: TAG,
    eventTAG: eventTAG
};

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(2),
    alarmWork = _require.alarmWork,
    alarmBreak = _require.alarmBreak,
    alarmKeys = _require.alarmKeys;

var _require2 = __webpack_require__(0),
    handleError = _require2.handleError;

var _require3 = __webpack_require__(1),
    TAG = _require3.TAG;

var setting = __webpack_require__(7);

var alarms = {
    TAG: '[Alarms] ',

    start: function start(id) {
        var delayInMinutes = setting.get(id);

        browser.alarms.create(id, {
            delayInMinutes: delayInMinutes
        });
    },
    stop: function stop() {
        console.log(TAG + alarms.TAG + 'stop...');
        browser.alarms.clearAll();
    },
    reload: function reload() {
        setting.load({
            callback: alarms.restart
        });
    },
    restart: function restart() {
        console.log(TAG + alarms.TAG + 'restart...');
        browser.alarms.getAll().then(function (allAlarms) {
            return allAlarms.map(function (alarm) {
                return alarm.name;
            });
        }).then(function (names) {

            browser.alarms.clearAll();
            names.forEach(function (name) {
                alarms.start(name);
            });
        });
    }
};

module.exports = alarms;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(8),
    clockLimit = _require.clockLimit,
    time = _require.time;

var _require2 = __webpack_require__(2),
    alarmCounter = _require2.alarmCounter;

var _require3 = __webpack_require__(0),
    handleResponse = _require3.handleResponse,
    handleError = _require3.handleError;

var _require4 = __webpack_require__(1),
    TAG = _require4.TAG;

var clock = {
    TAG: '[Counter] ',
    units: ['mins', 'hours', 'days'],
    reversed: false,
    id: alarmCounter.id,
    interval: alarmCounter.interval,
    skipLog: false,

    start: function start() {
        browser.alarms.create(clock.id, {
            periodInMinutes: clock.interval
        });
    },
    stop: function stop() {
        console.log(TAG + clock.TAG + 'stop...');
        browser.alarms.clear(clock.id);
        clock.time.reset();
    },
    reverse: function reverse() {
        var isReversed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        clock.reversed = isReversed;
    },

    time: {
        set: function set(number) {
            time.mins = number;
        },
        reset: function reset() {
            for (var key in time) {
                time[key] = 0;
            }
        },
        count: function count(number) {
            time.mins += number;
        }
    },
    ui: {
        sync: function sync() {
            if (browser.extension.getViews({ type: "popup" }).length) {
                browser.runtime.sendMessage({
                    time: time,
                    reversed: clock.reversed
                }).catch(handleError);
            }
        }
    }
};

module.exports = clock;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _paths;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = __webpack_require__(2),
    alarmWork = _require.alarmWork,
    alarmBreak = _require.alarmBreak;

var icon = {
    TAG: '[Icon] ',
    paths: (_paths = {}, _defineProperty(_paths, alarmWork.id, "icons/set-timer-button.png"), _defineProperty(_paths, alarmBreak.id, "icons/set-timer-button-red.png"), _paths),
    set: function set(id) {
        try {
            browser.browserAction.setIcon({
                path: icon.paths[id]
            });
        } catch (e) {
            console.error(e);
        }
    }
};

module.exports = icon;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(2),
    alarmBreak = _require.alarmBreak;

var _require2 = __webpack_require__(1),
    TAG = _require2.TAG;

var notificationParams = {
    type: 'basic',
    iconUrl: browser.extension.getURL("icons/notification.png"),
    title: browser.i18n.getMessage("notificationTitle"),
    message: browser.i18n.getMessage("notificationContent")
};

var notice = {
    TAG: '[notice] ',

    create: function create() {
        browser.notifications.create(alarmBreak.id, notificationParams);
    },
    clear: function clear() {
        browser.notifications.clear(alarmBreak.id);
    }
};

module.exports = notice;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _store;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = __webpack_require__(2),
    alarmWork = _require.alarmWork,
    alarmBreak = _require.alarmBreak,
    alarmKeys = _require.alarmKeys;

var _require2 = __webpack_require__(0),
    handleError = _require2.handleError;

var setting = {
    store: (_store = {}, _defineProperty(_store, alarmWork.id, alarmWork.interval), _defineProperty(_store, alarmBreak.id, alarmBreak.interval), _defineProperty(_store, "idleDetectionInterval", alarmBreak.interval * 60), _store),

    get: function get(id) {
        return setting.store[id];
    },
    load: function load(_ref) {
        var callback = _ref.callback,
            params = _ref.params;

        browser.storage.local.get(Object.keys(setting.store)).then(function (result) {
            for (var key in result) {
                setting.store[key] = result[key];
            }
            if (callback) {
                callback(params);
            }
        }, handleError);
    }
};

module.exports = setting;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var clockLimit = {
    days: 365,
    hours: 24,
    mins: 60
};

var time = {
    days: 0,
    hours: 0,
    mins: 0
};

module.exports = { clockLimit: clockLimit, time: time };

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    TAG = _require.TAG;

var _require2 = __webpack_require__(2),
    alarmWork = _require2.alarmWork;

var alarms = __webpack_require__(3);
var clock = __webpack_require__(4);
var notice = __webpack_require__(6);
var icon = __webpack_require__(5);

var isLocked = false;

var idle = {
    TAG: '[idle] ',
    setInterval: function setInterval(val) {
        browser.idle.setDetectionInterval(val);
    },
    dispatch: function dispatch(state) {
        switch (state) {
            case 'active':
                if (isLocked) {
                    console.log(TAG + idle.TAG + 're-activate...');
                    alarms.start(alarmWork.id);
                    clock.start();
                    isLocked = false;
                }
                break;
            case 'locked':
                console.log(TAG + idle.TAG + 'system locked, stop and reset...');
                clock.stop();
                alarms.stop();

                // reset ui and data
                icon.set(alarmWork.id);
                notice.clear();
                clock.reverse(false);
                clock.ui.sync();

                isLocked = true;
                break;
        }
    },
    detect: {
        start: function start() {
            browser.idle.onStateChanged.addListener(idle.dispatch);
        },
        stop: function stop() {
            browser.idle.onStateChanged.removeListener(idle.dispatch);
        }
    }
};

module.exports = idle;

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    TAG = _require.TAG;

var _require2 = __webpack_require__(2),
    alarmWork = _require2.alarmWork,
    alarmBreak = _require2.alarmBreak,
    alarmCounter = _require2.alarmCounter;

var _require3 = __webpack_require__(0),
    handleResponse = _require3.handleResponse,
    handleError = _require3.handleError;

var _require4 = __webpack_require__(8),
    clockLimit = _require4.clockLimit,
    time = _require4.time;

var icon = __webpack_require__(5);
var clock = __webpack_require__(4);
var alarms = __webpack_require__(3);
var idle = __webpack_require__(10);
var setting = __webpack_require__(7);
var notice = __webpack_require__(6);

/**
 *  callbacks
 */
function setUI(reversed, id) {
    clock.reverse(reversed);
    clock.time.reset();
    clock.ui.sync();
    icon.set(id);
}

function startWork() {
    alarms.start(alarmWork.id);
    setUI(false, alarmWork.id);
}

function startBreak() {
    alarms.start(alarmBreak.id);
    notice.create();
    setUI(true, alarmBreak.id);
}

/**
 *  business logic
 */
// start work-alarm
setting.load({
    callback: function callback() {
        startWork();
        clock.start();
        idle.detect.start();
    }
});

// start dispatch alarm event
browser.alarms.onAlarm.addListener(function (alarm) {
    switch (alarm.name) {
        case alarmWork.id:
            startBreak();
            break;

        case alarmBreak.id:
            startWork();
            break;

        case alarmCounter.id:
            clock.time.count(alarmCounter.interval);
            clock.ui.sync();
            break;
    }
});

// start dispatch request
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    /**
     * the sendResponse is undefined on Chrome
     * maybe the polyfill provided by moz includes bug?
     * so i use sendMessage
     * instead of directly call sendResponse
     */
    switch (request.type) {
        case 'requestTime':
            break;
        case 'resetCounter':
            alarms.stop();
            clock.stop();
            startWork();
            break;
    }
    if (browser.extension.getViews({ type: "popup" }).length) {
        browser.runtime.sendMessage({
            time: time,
            reversed: clock.reversed
        }).catch(handleError);
    }
    return true;
});

// reset alarms when setting changes
browser.storage.onChanged.addListener(function (changes, area) {
    if (area === 'local') {
        console.log(TAG + '[storage] changed');
        alarms.reload();
    }
});

/**
 *  interactive events
 */
browser.browserAction.onClicked.addListener(function () {
    browser.notifications.clear(alarmBreak.id);
});
// browser.browserAction.onClosed

/***/ })
/******/ ]);