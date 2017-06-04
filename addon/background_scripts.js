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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const env = __webpack_require__(2);

function handleResponse(r) {
    console.info(r);
}

function log(...args) {
    if (env.debugMode) {
        console.log(args.reduce((acc, val) => acc + val, ''));
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
        console.error(`input time [${minutes}] is not integer`);
        return 'ERROR';
    }
    let formatted = [];
    let hour = 0;
    if (minutes >= 60) {
        do {
            minutes -= 60;
            hour += 1;
        } while (minutes >= 60);
    }
    formatted.push(hour, minutes);
    return formatted.map(el => padTime(el)).join(':');
}

/**
 * accept a number
 * if it's less than 10, pad it with zero
 * @param {Number} val 
 */
function padTime(val) {
    return val < 10 ? `0${val}` : val;
}

module.exports = {
    handleResponse,
    toTitleCase,
    getLocalString,
    log,
    formatTime
};

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports) {

module.exports = {
    debugMode: true
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const defaultValues = __webpack_require__(1);
const storageKeys = ['isReading', 'passedMinutes', 'breakTimeAmount', 'readingTimeAmount', 'idleDetectionInterval', 'soundEnabled', 'soundPath'];

var storage = {
    store: {},

    load({ callback, params }) {
        browser.storage.local.get(null).then(result => {
            storageKeys.forEach(key => {
                storage.store[key] = result[key] || defaultValues[key];
            });
            if (callback) {
                callback(params);
            }
        }).catch(err => {
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

var clock = {
    reset() {
        storage.store.passedMinutes = 0;
    },
    plus(number) {
        storage.store.passedMinutes += number;
    }
};

module.exports = clock;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var counter = {
    start() {
        browser.alarms.create('eyes-alarm-counter', {
            periodInMinutes: 1
        });
    },
    stop() {
        browser.alarms.clear('eyes-alarm-counter');
    },
    restart() {
        counter.stop();
        counter.start();
    }
};

module.exports = counter;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var storage = __webpack_require__(3);

var timePacket = () => {
    return {
        time: storage.store.passedMinutes,
        limit: storage.store.isReading ? storage.store.readingTimeAmount : storage.store.breakTimeAmount,
        reading: storage.store.isReading
    };
};

module.exports = timePacket;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var storage = __webpack_require__(3);
var timePacket = __webpack_require__(7);
var { audioElement, defaultSoundPath } = __webpack_require__(10);
var paths = __webpack_require__(17);
var defaultValues = __webpack_require__(1);

let notificationParams = {
    type: 'basic',
    iconUrl: browser.extension.getURL(paths.notificationIcon),
    title: defaultValues.title,
    message: defaultValues.message
};
let notificationID = 'eyes-alarm-n';

var ui = {
    icon: {
        /**
         * once used to change the color of clock inside popup
         * @param {Boolean} isGreen 
         */
        switch(isGreen) {
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
        checkCustomDataExists(keys, callback) {
            browser.storage.local.get(keys).then(result => {
                callback(keys, result);
            });
        },
        /**
         * check if there it's some custom data to rewrite parameters used for showing notifiation
         * then check again, but this time is for playing sound
         */
        create() {
            ui.notice.checkCustomDataExists(['title', 'message'], (keys, result) => {
                // rewrite data for creating notification
                keys.forEach(key => {
                    if (result[key]) {
                        notificationParams[key] = result[key];
                    }
                });

                // creating
                browser.notifications.create(notificationID, notificationParams);
            });
            ui.notice.checkCustomDataExists(['soundEnabled', 'soundPath', 'soundVolume'], (keys, result) => {
                if (result.soundEnabled) {
                    ui.sound.play(result.soundPath, result.soundVolume);
                }
            });
        },
        /**
         * close notifcation
         */
        clear() {
            browser.notifications.clear(notificationID);
        }
    },
    clock: {
        /**
         * change storage.store.isReading
         * for indicating whether it's at reading mode
         * @param {Boolean} isGreen 
         */
        switch(isGreen) {
            storage.store.isReading = isGreen;
        },
        /**
         * send time to popup from background_script
         */
        sync() {
            if (browser.extension.getViews({ type: "popup" }).length) {
                browser.runtime.sendMessage(timePacket()).catch(err => {
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
        updatePath(path = '') {
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
        play(path, volume) {
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
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var defaultSoundPath = __webpack_require__(20);
var audioElement = new Audio(defaultSoundPath);

audioElement.preload = true;
audioElement.loop = false;

module.exports = {
  audioElement,
  defaultSoundPath
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var ui = __webpack_require__(8);
var clock = __webpack_require__(5);
var counter = __webpack_require__(6);
var audioElement = __webpack_require__(10);

var isLocked = false;

var idle = {
    init(val) {
        browser.idle.setDetectionInterval(val);
    },
    detect: {
        start: () => {
            browser.idle.onStateChanged.addListener(idle.dispatch);
        }
    },
    dispatch: state => {
        switch (state) {
            case 'active':
                if (isLocked) {
                    audioElement.muted = false;
                    counter.start();
                    //ui.icon.switch(true)
                    ui.clock.switch(true);
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

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

const { handleResponse } = __webpack_require__(0);
var ui = __webpack_require__(8);
var idle = __webpack_require__(11);
var clock = __webpack_require__(5);
var counter = __webpack_require__(6);
var storage = __webpack_require__(3);
var timePacket = __webpack_require__(7);

/**
 *  callbacks
 */
function resetUI(iconIsGreen) {
    clock.reset();
    //ui.icon.switch(iconIsGreen)
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

// dispatch alarm event
browser.alarms.onAlarm.addListener(alarm => {
    updateClock();
    if (shouldBreak()) {
        counter.restart();
        resetUI(false); // turn to red
        ui.notice.create();
    } else if (shouldRead()) {
        counter.restart();
        resetUI(true); // turn to green
    }
});

// start dispatch request
browser.runtime.onMessage.addListener((request, sender) => {
    switch (request.type) {

        case 'requestTime':
            return Promise.resolve(timePacket());

        case 'resetCounter':
            counter.restart();
            resetUI(true);
            return Promise.resolve(timePacket());
    }
});

// reset alarms when setting changes

browser.storage.onChanged.addListener((changes, area) => {
    if (area === 'local') {
        storage.load({
            callback: () => {
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
    callback: () => {
        idle.init(storage.store.idleDetectionInterval);
        idle.detect.start();
        counter.start();
    }
});

/***/ }),
/* 17 */
/***/ (function(module, exports) {

var paths = {
    greenButton: "icons/set-timer-button.png",
    redButton: "icons/set-timer-button-red.png",
    notificationIcon: "icons/icon-pad@128.png",
    coloredButton: "icons/icon@128.png"
};

module.exports = paths;

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a5d97ad536ac3f7b1accf037828bafed.wav";

/***/ })
/******/ ]);