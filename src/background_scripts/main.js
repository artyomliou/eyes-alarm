const {TAG} = require("../tags")
const {alarmWork, alarmBreak, alarmCounter} = require("../configs/alarms")
const {handleError} = require('../utility')
var {clockLimit, time} = require("./time")
var icon = require("./icon")
var clock = require("./clock")
var alarms = require("./alarms")
var idle = require("./idle")
var setting = require("./setting")
var notice = require("./notice")

/**
 *  callbacks
 */
function setUI(reversed, id) {
    clock.reverse(reversed)
    clock.time.reset()
    clock.ui.sync()
    icon.set(id)
}

function startWork() {
    alarms.start(alarmWork.id)
    setUI(false, alarmWork.id)
}

function startBreak() {
    alarms.start(alarmBreak.id)
    setUI(true, alarmBreak.id)
    notice.create()
}

/**
 *  business logic
 */
// start work-alarm
setting.load({
    callback: () => {
        startWork()
        idle.detect.start()
    }
})

// start dispatch alarm event
browser.alarms.onAlarm.addListener(alarm => {
    switch (alarm.name) {
        case alarmWork.id:
            startBreak()
            break;

        case alarmBreak.id:
            startWork()
            break;

        case alarmCounter.id:
            clock.time.count(alarmCounter.interval)
            clock.ui.sync()
            break;
    }
})

// start dispatch request
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
            alarms.stop()
            clock.stop()
            startWork()
            break;
    }
    if (browser.extension.getViews({ type: "popup" }).length) {
        browser.runtime.sendMessage({
            time,
            reversed: clock.reversed
        }).catch(handleError)
    }
    return true;
})

// reset alarms when setting changes
browser.storage.onChanged.addListener((changes, area) => {
    if (area === 'local') {
        console.log(TAG + '[storage] changed')
        alarms.reload()
    }
})

/**
 *  interactive events
 */
browser.browserAction.onClicked.addListener(() => {
    browser.notifications.clear(alarmBreak.id)
})
// browser.browserAction.onClosed
