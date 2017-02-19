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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(3),
    workTimeKey = _require.workTimeKey,
    breakTimeKey = _require.breakTimeKey,
    keys = _require.keys,
    defaultValues = _require.defaultValues;

var alarmWork = {
    id: 'alarmWork',
    interval: defaultValues[workTimeKey]
};
var alarmBreak = {
    id: 'alarmBreak',
    interval: defaultValues[breakTimeKey]
};
var alarmCounter = {
    id: 'alarmCounter',
    interval: 1
};
var alarmClockUpdate = {
    id: 'alarmClockUpdate',
    interval: 1
};

module.exports = {
    alarmWork: alarmWork,
    alarmBreak: alarmBreak,
    alarmCounter: alarmCounter,
    alarmClockUpdate: alarmClockUpdate
};

/***/ }),
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(5),
    clockLimit = _require.clockLimit,
    time = _require.time;

var _require2 = __webpack_require__(2),
    alarmCounter = _require2.alarmCounter;

var counter = {
    TAG: '[Counter] ',
    units: ['mins', 'hours', 'days'],
    reversed: false,

    start: function start() {
        browser.alarms.create(alarmCounter.id, {
            periodInMinutes: alarmCounter.interval
        });
    },

    restart: function restart() {
        browser.alarms.clear(alarmCounter.id);
        counter.start();
        counter.reset();
    },

    reset: function reset() {
        for (var key in time) {
            if (time.hasOwnProperty(key)) {
                time[key] = 0;
            }
        }
    },

    set: function set() {
        var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var isReversed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (number !== null) {
            time.mins = number;
        }
        if (isReversed !== null) {
            counter.reversed = isReversed;
        }
    },

    update: function update(number) {
        if (counter.reversed) {
            time.mins -= number;
        } else {
            time.mins += number;
        }
    },

    sync: function sync() {
        if (browser.extension.getViews({ type: "popup" }).length) {
            browser.runtime.sendMessage({
                time: time,
                reversed: counter.reversed
            });
        }
    },

    carry: function carry() {
        counter.units.forEach(function (unit, index, list) {

            var exceeds = time[unit] >= clockLimit[unit];
            var nextUnitExists = list.indexOf(index + 1) !== -1;

            if (exceeds && nextUnitExists) {
                var nextUnit = list[index + 1];
                time[unit] = 0;
                time[nextUnit]++;
            }
        });
    }
};

module.exports = counter;

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(2),
    alarmWork = _require.alarmWork,
    alarmBreak = _require.alarmBreak;

var _require2 = __webpack_require__(1),
    handleError = _require2.handleError;

var _require3 = __webpack_require__(3),
    workTimeKey = _require3.workTimeKey,
    breakTimeKey = _require3.breakTimeKey;

var _require4 = __webpack_require__(0),
    TAG = _require4.TAG;

var counter = __webpack_require__(4);

var alarms = {
    TAG: '[Alarms] ',
    create: function create(id, delayInMinutes) {
        browser.alarms.create(id, {
            delayInMinutes: delayInMinutes
        });
    },
    loadThenCreate: function loadThenCreate(key, params) {
        browser.storage.local.get(key).then(function (result) {

            var delay = result[key] || params.interval;
            alarms.create(params.id, delay);

            if (params.id === alarmBreak.id) {
                counter.set(delay);
            }
            counter.sync();
        }, handleError);
    },
    set: function set(name) {
        switch (name) {
            case alarmWork.id:
                alarms.loadThenCreate(workTimeKey, alarmWork);
                break;

            case alarmBreak.id:
                alarms.loadThenCreate(breakTimeKey, alarmBreak);
                break;
        }
    },
    reload: function reload() {
        console.log(TAG + alarms.TAG + 'reload...');
        browser.alarms.getAll().then(function (allAlarms) {
            var names = allAlarms.map(function (alarm) {
                return alarm.name;
            });

            if (names.includes(alarmWork.id)) {
                alarms.set(alarmWork.id);
            } else if (names.includes(alarmBreak.id)) {
                alarms.set(alarmBreak.id);
            }
        });
    }
};

module.exports = alarms;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(2),
    alarmWork = _require.alarmWork,
    alarmBreak = _require.alarmBreak;

var icon = {
    TAG: '[Icon] ',
    set: function set(name) {
        if (name === alarmWork.id) {
            browser.browserAction.setIcon({ path: "icons/set-timer-button.png" });
        } else if (name === alarmBreak.id) {
            browser.browserAction.setIcon({ path: "icons/set-timer-button-red.png" });
        }
    }
};

module.exports = icon;

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    TAG = _require.TAG,
    eventTAG = _require.eventTAG;

var _require2 = __webpack_require__(2),
    alarmWork = _require2.alarmWork,
    alarmBreak = _require2.alarmBreak,
    alarmCounter = _require2.alarmCounter;

var notificationParams = {
    type: 'basic',
    iconUrl: browser.extension.getURL("icons/set-timer-button-red.png"),
    title: browser.i18n.getMessage("notificationTitle"),
    message: browser.i18n.getMessage("notificationContent")
};

/**
 *  callbacks
 */

var _require3 = __webpack_require__(5),
    clockLimit = _require3.clockLimit,
    time = _require3.time;

var icon = __webpack_require__(7);
var counter = __webpack_require__(4);
var alarms = __webpack_require__(6);

/**
 *  event dispatcher
 */
function alarmEventsDispatch(alarm) {
    switch (alarm.name) {
        case alarmWork.id:
            console.log(TAG + eventTAG + 'start break');
            counter.set(null, true);
            counter.restart();
            alarms.set(alarmBreak.id);
            icon.set(alarmBreak.id);
            browser.notifications.create(alarmBreak.id, notificationParams);
            break;

        case alarmBreak.id:
            console.log(TAG + eventTAG + 'start work');
            counter.set(null, false);
            counter.restart();
            alarms.set(alarmWork.id);
            icon.set(alarmWork.id);
            break;

        case alarmCounter.id:
            counter.update(alarmCounter.interval);
            counter.carry();
            counter.sync();
            break;
    }
}

/**
 *  business logic
 */
// start work-alarm
alarms.set(alarmWork.id);

// start time counter
counter.start();

// start response any request
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var msg = {
        time: time,
        reversed: counter.reversed
    };
    switch (request.type) {
        case 'requestTime':
            sendResponse(msg);
            break;
        case 'resetCounter':
            alarms.reload();
            counter.restart();
            sendResponse(msg);
            break;
    }
    return true;
});

// start response alarm events
browser.alarms.onAlarm.addListener(alarmEventsDispatch);

// reset alarms when setting changes
browser.storage.onChanged.addListener(function (changes, area) {
    if (area === 'local') {
        console.log(TAG + 'storage changed');
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