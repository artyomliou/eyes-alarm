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

const env=__webpack_require__(2);function handleResponse(a){console.info(a)}function log(...a){env.debugMode&&console.log(a.reduce((b,c)=>b+c,''))}function toTitleCase(a){return a.charAt(0).toUpperCase()+a.substr(1).toLowerCase()}function getLocalString(a){return browser.i18n.getMessage(a)}function formatTime(a){if(!Number.isInteger(a))return console.error(`input time [${a}] is not integer`),'ERROR';let b=[],c=0;if(60<=a)do a-=60,c+=1;while(60<=a);return b.push(c,a),b.map((d)=>padTime(d)).join(':')}function padTime(a){return 10>a?`0${a}`:a}module.exports={handleResponse,toTitleCase,getLocalString,log,formatTime};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports={isReading:!0,passedMinutes:0,breakTimeAmount:10,readingTimeAmount:50,idleDetectionInterval:1200,title:browser.i18n.getMessage("notificationTitle"),message:browser.i18n.getMessage("notificationMessage"),soundEnabled:!1,soundPath:"",soundVolume:0.5};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports={debugMode:!0};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const defaultValues=__webpack_require__(1),storageKeys=['isReading','passedMinutes','breakTimeAmount','readingTimeAmount','idleDetectionInterval','soundEnabled','soundPath'];var storage={store:{},load({callback:a,params:b}){browser.storage.local.get(null).then((c)=>{storageKeys.forEach((d)=>{storage.store[d]=c[d]||defaultValues[d]}),a&&a(b)}).catch((c)=>{console.error(c)})}};module.exports=storage;

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var storage=__webpack_require__(3),clock={reset(){storage.store.passedMinutes=0},plus(a){storage.store.passedMinutes+=a}};module.exports=clock;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var counter={start(){browser.alarms.create('eyes-alarm-counter',{periodInMinutes:1})},stop(){browser.alarms.clear('eyes-alarm-counter')},restart(){counter.stop(),counter.start()}};module.exports=counter;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var storage=__webpack_require__(3),timePacket=()=>{return{time:storage.store.passedMinutes,limit:storage.store.isReading?storage.store.readingTimeAmount:storage.store.breakTimeAmount,reading:storage.store.isReading}};module.exports=timePacket;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var storage=__webpack_require__(3),timePacket=__webpack_require__(7),{audioElement,defaultSoundPath}=__webpack_require__(10),paths=__webpack_require__(17),defaultValues=__webpack_require__(1);let notificationParams={type:"basic",iconUrl:browser.extension.getURL(paths.notificationIcon),title:defaultValues.title,message:defaultValues.message},notificationID="eyes-alarm-n";var ui={icon:{switch(){}},notice:{checkCustomDataExists(a,b){browser.storage.local.get(a).then((c)=>{b(a,c)})},create(){ui.notice.checkCustomDataExists(["title","message"],(a,b)=>{a.forEach((c)=>{b[c]&&(notificationParams[c]=b[c])}),browser.notifications.create(notificationID,notificationParams)}),ui.notice.checkCustomDataExists(["soundEnabled","soundPath","soundVolume"],(a,b)=>{b.soundEnabled&&ui.sound.play(b.soundPath,b.soundVolume)})},clear(){browser.notifications.clear(notificationID)}},clock:{switch(a){storage.store.isReading=a},sync(){browser.extension.getViews({type:"popup"}).length&&browser.runtime.sendMessage(timePacket()).catch((a)=>{console.error(a)})}},sound:{updatePath(a=""){a?audioElement.src!==a&&(audioElement.src=a):audioElement.src!==defaultSoundPath&&(audioElement.src=defaultSoundPath)},play(a,b){try{ui.sound.updatePath(a),audioElement.volume=b,audioElement.play()}catch(c){console.error(c),console.log(audioElement)}}}};module.exports=ui;

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var defaultSoundPath=__webpack_require__(20),audioElement=new Audio(defaultSoundPath);audioElement.preload=!0,audioElement.loop=!1,module.exports={audioElement,defaultSoundPath};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var ui=__webpack_require__(8),clock=__webpack_require__(5),counter=__webpack_require__(6),audioElement=__webpack_require__(10),isLocked=!1,idle={init(a){browser.idle.setDetectionInterval(a)},detect:{start:()=>{browser.idle.onStateChanged.addListener(idle.dispatch)}},dispatch:(a)=>{"active"===a?isLocked&&(audioElement.muted=!1,counter.start(),ui.clock.switch(!0),ui.clock.sync(),isLocked=!1):"idle"===a||"locked"===a?(audioElement.muted=!0,counter.stop(),ui.notice.clear(),clock.reset(),isLocked=!0):void 0}};module.exports=idle;

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

const{handleResponse}=__webpack_require__(0);var ui=__webpack_require__(8),idle=__webpack_require__(11),clock=__webpack_require__(5),counter=__webpack_require__(6),storage=__webpack_require__(3),timePacket=__webpack_require__(7);function resetUI(a){clock.reset(),ui.clock.switch(a),ui.clock.sync()}function shouldRead(){return!storage.store.isReading&&storage.store.passedMinutes>=storage.store.breakTimeAmount}function shouldBreak(){return storage.store.isReading&&storage.store.passedMinutes>=storage.store.readingTimeAmount}function updateClock(){clock.plus(1),ui.clock.sync()}browser.alarms.onAlarm.addListener(()=>{updateClock(),shouldBreak()?(counter.restart(),resetUI(!1),ui.notice.create()):shouldRead()&&(counter.restart(),resetUI(!0))}),browser.runtime.onMessage.addListener((a)=>{switch(a.type){case"requestTime":return Promise.resolve(timePacket());case"resetCounter":return counter.restart(),resetUI(!0),Promise.resolve(timePacket());}}),browser.storage.onChanged.addListener((a,b)=>{"local"===b&&storage.load({callback:()=>{counter.restart(),resetUI(!0)}})}),storage.load({callback:()=>{idle.init(storage.store.idleDetectionInterval),idle.detect.start(),counter.start()}});

/***/ }),
/* 17 */
/***/ (function(module, exports) {

var paths={greenButton:"icons/set-timer-button.png",redButton:"icons/set-timer-button-red.png",notificationIcon:"icons/icon-pad@128.png",coloredButton:"icons/icon@128.png"};module.exports=paths;

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a5d97ad536ac3f7b1accf037828bafed.wav";

/***/ })
/******/ ]);