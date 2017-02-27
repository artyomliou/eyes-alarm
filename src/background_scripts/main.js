const {TAG, eventTAG} = require("../tags")
const {alarmWork, alarmBreak, alarmCounter} = require("../configs/alarms")
const {handleResponse, handleError, log} = require('../utility')
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
    clock.ui.sync()
    icon.set(id)
}

function startWork() {
    log(TAG + 'start work...')
    alarms.start(alarmWork.id)
    clock.restart()
    setUI(false, alarmWork.id)
}

function startBreak() {
    log(TAG + 'start break...')
    alarms.start(alarmBreak.id)
    clock.restart()
    notice.create()
    setUI(true, alarmBreak.id)
}

/**
 *  business logic
 */
// start work-alarm
setting.load({
    callback: () => {
        idle.detect.start()
        startWork()
    }
})

// start dispatch alarm event
browser.alarms.onAlarm.addListener(alarm => {
    log(TAG + eventTAG + alarm.name)
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
    log(TAG + eventTAG + request.type)
    switch (request.type) {
        case 'requestTime':
            break;
        case 'resetCounter':
            alarms.stopAll()
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
        log(TAG + '[storage] changed')
        setting.load({
            callback: () => {
                alarms.restart()
                clock.restart()
            }
        })
    }
})

/**
 *  interactive events
 */
browser.browserAction.onClicked.addListener(() => {
    browser.notifications.clear(alarmBreak.id)
})
// browser.browserAction.onClosed
