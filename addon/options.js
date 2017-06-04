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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
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
    getDOM(key) {
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const { toTitleCase, getLocalString } = __webpack_require__(0);
const defaultValues = __webpack_require__(1);
var nodes = __webpack_require__(4);

// used to map a DOM's key to the locallized string
// to render the options page
const reflect = {
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
};

// used to retrieve data from specified nodes
const storageKeys = ['breakTimeAmount', 'readingTimeAmount', 'title', 'message', 'soundEnabled', 'soundPath', 'soundVolume'];

var page = {
    render() {
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
                set(e = null) {
                    let value = e === null ? nodes.getDOM('soundVolume').value : e.target.value;

                    nodes.getDOM('soundVolumeValue').innerText = `${value * 100}%`;
                }
            }
        },
        /**
         * render all labels
         */
        set() {
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
            toggleEditable(e = null) {
                let disabled = false;
                let switchList = ['soundPath', 'soundVolume'];

                if (e === null) {
                    disabled = !nodes.getDOM('soundEnabled').checked;
                } else {
                    disabled = !e.target.checked;
                }

                switchList.forEach(key => {
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
        set() {
            browser.storage.local.get(storageKeys).then(result => {
                storageKeys.forEach(key => {
                    let node = nodes.getDOM(key);
                    let value = result[key] || defaultValues[key];
                    switch (node.type) {
                        case 'checkbox':
                            nodes.getDOM(key).checked = value;
                            break;
                        default:
                            nodes.getDOM(key).value = value;
                            break;
                    }
                });

                // display current sound volume
                page.labels.sound.volume.set();

                // toggle columns related to custom-sound editable or not
                page.inputs.sound.toggleEditable();
            }).catch(err => {
                console.error(err);
            });
        },
        /**
         * get all data specified by storageKeys,
         * append a timestamp(last_modified) for always updating value against browser's mechanism
         */
        get() {
            let set = {
                last_modified: new Date().toLocaleTimeString()
            };
            storageKeys.forEach(key => {
                let node = nodes.getDOM(key);
                let attrs = node.attributes;

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
        dom() {
            return Array.from(storageKeys.map(key => nodes.getDOM(key)));
        }
    },
    button: {
        loading: {
            /**
             * toggle loading animation for Apply button
             * @param {Boolean} isLoading 
             */
            toggle(isLoading = false) {
                nodes.getDOM('apply').classList.toggle('is-loading', isLoading);
            },
            /**
             * generate callback to turn on/off loading animation
             * @param {Boolean} isLoading 
             */
            toggleFactory(isLoading) {
                return () => {
                    nodes.getDOM('apply').classList.toggle('is-loading', isLoading);
                };
            }
        }
    }
};

module.exports = page;

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const { getLocalString } = __webpack_require__(0);
var page = __webpack_require__(9);
var nodes = __webpack_require__(4);
var defaultValues = __webpack_require__(1);

var options = {
    /**
     * gather data from all specified columns
     * (specify by storageKeys of page.js)
     * then save them
     * @param {Event} e 
     */
    save(e) {
        page.button.loading.toggle(true); // animation
        e.preventDefault();

        let data = page.inputs.get();
        let dom = page.inputs.dom();
        let timestamp = `[${data.last_modified}] `;
        let stopLoadingAnimation = page.button.loading.toggleFactory(false);

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
    reset(e) {
        e.preventDefault();

        let data = ({ title, message, breakTimeAmount, readingTimeAmount } = defaultValues);
        let timestamp = data.last_modified = new Date().toLocaleTimeString();

        options.apply(timestamp, data, function updateOptionsInputs() {
            page.inputs.set();
        });
    },
    /**
     * 根據input type 檢查資料是否合乎要求
     * @param {*} dom 
     */
    checkInputErrorExists(dom) {
        return dom.map(el => {

            if (el.attributes.type && el.attributes.type.value === "number") {
                return el.validity.rangeOverflow || el.validity.rangeUnderflow;
                // returning True means that something is wrong
            } else {
                    return false;
                    // so return False when checking a non-number input
                }
        }).filter(el => el).length;
    },
    /**
     * save data into local storage
     * @param {String} timestamp 
     * @param {Object} data 
     * @param {Function} successCallback 
     * @param {Function} failCallback
     */
    apply(timestamp, data, successCallback = undefined, failCallback = undefined) {

        browser.storage.local.set(data).then(() => {
            options.msg(timestamp + getLocalString('optionsApplySuccessMessage'), true);
            successCallback && successCallback();
        }).catch(err => {
            options.msg(timestamp + err.message, false);
            failCallback && failCallback();
        });
    },
    msg(text, isSuccess) {
        let n = nodes.getDOM('msg');
        n.innerText = text;
        n.classList.toggle('success', isSuccess);
        n.classList.toggle('warning', !isSuccess);
    }
};

module.exports = options;

/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);
var options = __webpack_require__(12);
var page = __webpack_require__(9);
var nodes = __webpack_require__(4);

document.addEventListener("DOMContentLoaded", page.render);
nodes.getDOM("apply").addEventListener("click", options.save);
nodes.getDOM("reset").addEventListener("click", options.reset);
nodes.getDOM("soundEnabled").addEventListener("click", page.inputs.sound.toggleEditable);
nodes.getDOM("soundVolume").addEventListener("change", page.labels.sound.volume.set);

/***/ })
/******/ ]);