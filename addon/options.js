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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const env=__webpack_require__(2);function handleResponse(a){console.info(a)}function toTitleCase(a){return a.charAt(0).toUpperCase()+a.substr(1).toLowerCase()}function getLocalString(a){return browser.i18n.getMessage(a)}function log(...a){env.debugMode&&console.log(a.reduce((b,c)=>b+c,''))}function formatTime(a){if(!Number.isInteger(a))return console.error(`input time [${a}] is not integer`),'ERROR';let b=[],c=0;if(60<=a)do a-=60,c+=1;while(60<=a);return b.push(c,a),b.map((d)=>padTime(d)).join(':')}function padTime(a){return 10>a?`0${a}`:a}module.exports={handleResponse,toTitleCase,getLocalString,log,formatTime};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports={isReading:!0,passedMinutes:0,breakTimeAmount:10,readingTimeAmount:50,idleDetectionInterval:1200,title:browser.i18n.getMessage("notificationTitle"),message:browser.i18n.getMessage("notificationMessage"),soundEnabled:!1,soundPath:""};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports={debugMode:!0};

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

var nodes={pool:{},getDOM(a){return nodes.pool.hasOwnProperty(a)?nodes.pool[a]:nodes.pool[a]=document.querySelector('#'+a)}};module.exports=nodes;

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const{toTitleCase,getLocalString}=__webpack_require__(0),defaultValues=__webpack_require__(1);var nodes=__webpack_require__(4);const reflect={readingTime_label:'optionsWorkTimeLabel',breakTime_label:'optionsBreakTimeLabel',title_label:'optionsNotificationTitleLabel',message_label:'optionsNotificationMessageLabel',soundEnabled_label:'optionsSoundEnabledLabel',soundPath_label:'optionsSoundPathLabel',apply:'optionsApplyButton',reset:'optionsResetButton'},storageKeys=['breakTimeAmount','readingTimeAmount','title','message','soundEnabled','soundPath'];var page={render(){page.labels.set(),page.inputs.set()},labels:{set(){for(var a in reflect)nodes.getDOM(a).innerText=getLocalString(reflect[a])}},inputs:{set(){browser.storage.local.get(storageKeys).then((a)=>{storageKeys.forEach((b)=>{let c=nodes.getDOM(b),d=a[b]||defaultValues[b];switch(c.type){case'checkbox':nodes.getDOM(b).checked=d;break;default:nodes.getDOM(b).value=d;}})}).catch((a)=>{console.error(a)})},get(){let a={last_modified:new Date().toLocaleTimeString()};return storageKeys.forEach((b)=>{let c=nodes.getDOM(b),d=c.attributes;if(d.type)switch(d.type.value){case'number':a[b]=c.valueAsNumber;break;case'checkbox':a[b]=c.checked;break;default:a[b]=c.value;}else a[b]=c.value}),a},dom(){return Array.from(storageKeys.map((a)=>nodes.getDOM(a)))}},button:{toggleLoading(a=''){''===a?nodes.getDOM('apply').classList.toggle('is-loading'):nodes.getDOM('apply').classList.toggle('is-loading',a)}}};module.exports=page;

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const{getLocalString}=__webpack_require__(0);var page=__webpack_require__(9),nodes=__webpack_require__(4),defaultValues=__webpack_require__(1),options={save(a){a.preventDefault();let b=page.inputs.get(),c=page.inputs.dom(),d=`[${b.last_modified}] `;return options.checkInputErrorExists(c)?void options.msg('',!1):void options.apply(d,b)},switchSelectButtonStatus(a){let b=!a.target.checked;nodes.getDOM('soundPath').disabled=b},reset(a){a.preventDefault();let b=({title,message,breakTimeAmount,readingTimeAmount}=defaultValues),c=b.last_modified=new Date().toLocaleTimeString();options.apply(c,b,function(){page.inputs.set()})},checkInputErrorExists(a){return a.map((b)=>{return b.attributes.type&&'number'===b.attributes.type.value&&(b.validity.rangeOverflow||b.validity.rangeUnderflow)}).filter((b)=>b).length},apply(a,b,c=void 0){page.button.toggleLoading(!0),browser.storage.local.set(b).then(()=>{options.msg(a+getLocalString('optionsApplySuccessMessage'),!0),c&&c(),page.button.toggleLoading(!1)}).catch((d)=>{options.msg(a+d.message,!1),page.button.toggleLoading(!1)})},msg(a,b){let c=nodes.getDOM('msg');c.innerText=a,c.classList.toggle('success',b),c.classList.toggle('warning',!b)}};module.exports=options;

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(13);var options=__webpack_require__(11),page=__webpack_require__(9),nodes=__webpack_require__(4);document.addEventListener('DOMContentLoaded',page.render),nodes.getDOM('apply').addEventListener('click',options.save),nodes.getDOM('reset').addEventListener('click',options.reset),nodes.getDOM('soundEnabled').addEventListener('click',options.switchSelectButtonStatus);

/***/ })
/******/ ]);