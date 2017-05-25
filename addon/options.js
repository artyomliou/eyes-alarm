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

module.exports={isReading:!0,passedMinutes:0,breakTimeAmount:10,readingTimeAmount:50,idleDetectionInterval:1200,title:browser.i18n.getMessage("notificationTitle"),message:browser.i18n.getMessage("notificationMessage"),soundEnabled:!1,customSoundURL:""};

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

const{toTitleCase,getLocalString}=__webpack_require__(0),defaultValues=__webpack_require__(1);var nodes=__webpack_require__(4);const reflect={readingTime_label:'optionsWorkTimeLabel',breakTime_label:'optionsBreakTimeLabel',title_label:'optionsNotificationTitleLabel',message_label:'optionsNotificationMessageLabel',apply:'optionsApplyButton',reset:'optionsResetButton'},storageKeys=['breakTimeAmount','readingTimeAmount','title','message','soundEnabled','customSoundURL'];var page={render(){page.labels.set(),page.inputs.set()},labels:{set(){for(var a in reflect)nodes.getDOM(a).innerText=getLocalString(reflect[a])}},inputs:{set(){browser.storage.local.get(storageKeys).then((a)=>{storageKeys.forEach((b)=>{nodes.getDOM(b).value=a[b]||defaultValues[b]})}).catch((a)=>{console.error(a)})},get(){let a={last_modified:new Date().toLocaleTimeString()};return storageKeys.forEach((b)=>{let c=nodes.getDOM(b),d=c.attributes;a[b]=d.type&&'number'===d.type.value?c.valueAsNumber:c.value}),a},dom(){return Array.from(storageKeys.map((a)=>nodes.getDOM(a)))}}};module.exports=page;

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const{getLocalString}=__webpack_require__(0);var page=__webpack_require__(9),nodes=__webpack_require__(4),defaultValues=__webpack_require__(1),options={save(a){a.preventDefault();let b=page.inputs.get(),c=page.inputs.dom(),d=`[${b.last_modified}] `;return options.checkInputErrorExists(c)?void options.msg('',!1):void options.apply(d,b)},saveFilePath(a){console.log(a)},switchSelectButtonStatus(a){switch(console.log(nodes.getDOM('selectSoundFile')),a.target.value){case'true':break;default:case'false':}},reset(a){a.preventDefault();let b=({title,message,breakTimeAmount,readingTimeAmount}=defaultValues),c=b.last_modified=new Date().toLocaleTimeString();options.apply(c,b,function(){page.inputs.set()})},checkInputErrorExists(a){return a.map((b)=>{return b.attributes.type&&'number'===b.attributes.type.value&&(b.validity.rangeOverflow||b.validity.rangeUnderflow)}).filter((b)=>b).length},apply(a,b,c=void 0){browser.storage.local.set(b).then(()=>{options.msg(a+getLocalString('optionsApplySuccessMessage'),!0),c&&c()}).catch((d)=>{options.msg(a+d.message,!1)})},msg(a,b){let c=nodes.getDOM('msg');c.innerText=a,c.classList.toggle('success',b),c.classList.toggle('warning',!b)}};module.exports=options;

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Can't resolve './bulma/sass/grid/notification.less' in 'C:\\wamp64\\www\\eyes-alarm\\src\\styles'\n @ C:\\wamp64\\www\\eyes-alarm\\src\\styles\\options_entry.less (line 4, column 0)\n near lines:\n   @import \"bulma/sass/grid/button\";\n   @import \"bulma/sass/grid/notification\";\n   \n    at runLoaders (C:\\wamp64\\www\\eyes-alarm\\node_modules\\webpack\\lib\\NormalModule.js:192:19)\n    at C:\\wamp64\\www\\eyes-alarm\\node_modules\\loader-runner\\lib\\LoaderRunner.js:364:11\n    at C:\\wamp64\\www\\eyes-alarm\\node_modules\\loader-runner\\lib\\LoaderRunner.js:230:18\n    at context.callback (C:\\wamp64\\www\\eyes-alarm\\node_modules\\loader-runner\\lib\\LoaderRunner.js:111:13)\n    at C:\\wamp64\\www\\eyes-alarm\\node_modules\\less-loader\\index.js:68:16\n    at C:\\wamp64\\www\\eyes-alarm\\node_modules\\less\\lib\\less\\render.js:26:35\n    at C:\\wamp64\\www\\eyes-alarm\\node_modules\\less\\lib\\less\\parse.js:62:33\n    at ImportVisitor.finish [as _finish] (C:\\wamp64\\www\\eyes-alarm\\node_modules\\less\\lib\\less\\parser\\parser.js:180:28)\n    at ImportVisitor._onSequencerEmpty (C:\\wamp64\\www\\eyes-alarm\\node_modules\\less\\lib\\less\\visitors\\import-visitor.js:35:14)\n    at ImportSequencer.tryRun (C:\\wamp64\\www\\eyes-alarm\\node_modules\\less\\lib\\less\\visitors\\import-sequencer.js:50:14)\n    at C:\\wamp64\\www\\eyes-alarm\\node_modules\\less\\lib\\less\\visitors\\import-sequencer.js:19:25\n    at fileParsedFunc (C:\\wamp64\\www\\eyes-alarm\\node_modules\\less\\lib\\less\\import-manager.js:50:17)\n    at C:\\wamp64\\www\\eyes-alarm\\node_modules\\less\\lib\\less\\import-manager.js:121:17\n    at C:\\wamp64\\www\\eyes-alarm\\node_modules\\less-loader\\index.js:111:5\n    at onResolved (C:\\wamp64\\www\\eyes-alarm\\node_modules\\enhanced-resolve\\lib\\Resolver.js:70:11)\n    at loggingCallbackWrapper (C:\\wamp64\\www\\eyes-alarm\\node_modules\\enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at afterInnerCallback (C:\\wamp64\\www\\eyes-alarm\\node_modules\\enhanced-resolve\\lib\\Resolver.js:138:10)\n    at loggingCallbackWrapper (C:\\wamp64\\www\\eyes-alarm\\node_modules\\enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at Resolver.applyPluginsAsyncSeriesBailResult1 (C:\\wamp64\\www\\eyes-alarm\\node_modules\\tapable\\lib\\Tapable.js:181:46)\n    at innerCallback (C:\\wamp64\\www\\eyes-alarm\\node_modules\\enhanced-resolve\\lib\\Resolver.js:125:19)\n    at loggingCallbackWrapper (C:\\wamp64\\www\\eyes-alarm\\node_modules\\enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at C:\\wamp64\\www\\eyes-alarm\\node_modules\\tapable\\lib\\Tapable.js:283:15\n    at C:\\wamp64\\www\\eyes-alarm\\node_modules\\enhanced-resolve\\lib\\UnsafeCachePlugin.js:38:4\n    at loggingCallbackWrapper (C:\\wamp64\\www\\eyes-alarm\\node_modules\\enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at afterInnerCallback (C:\\wamp64\\www\\eyes-alarm\\node_modules\\enhanced-resolve\\lib\\Resolver.js:138:10)\n    at loggingCallbackWrapper (C:\\wamp64\\www\\eyes-alarm\\node_modules\\enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at Resolver.applyPluginsAsyncSeriesBailResult1 (C:\\wamp64\\www\\eyes-alarm\\node_modules\\tapable\\lib\\Tapable.js:181:46)\n    at innerCallback (C:\\wamp64\\www\\eyes-alarm\\node_modules\\enhanced-resolve\\lib\\Resolver.js:125:19)\n    at loggingCallbackWrapper (C:\\wamp64\\www\\eyes-alarm\\node_modules\\enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at C:\\wamp64\\www\\eyes-alarm\\node_modules\\tapable\\lib\\Tapable.js:283:15");

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(13);var options=__webpack_require__(11),page=__webpack_require__(9),nodes=__webpack_require__(4);document.addEventListener('DOMContentLoaded',page.render),nodes.getDOM('apply').addEventListener('click',options.save),nodes.getDOM('reset').addEventListener('click',options.reset),nodes.getDOM('soundEnabled').addEventListener('click',options.switchSelectButtonStatus),nodes.getDOM('selectSoundFile').addEventListener('change',options.reset);

/***/ })
/******/ ]);