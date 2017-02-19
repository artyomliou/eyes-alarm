const {TAG, eventTAG} = require("../extension_tag")
const {alarmWork, alarmBreak, alarmCounter} = require("../configs/alarms")
const notificationParams = {
    type: 'basic',
    iconUrl: browser.extension.getURL("icons/set-timer-button-red.png"),
    title: browser.i18n.getMessage("notificationTitle"),
    message: browser.i18n.getMessage("notificationContent")
}


/**
 *  callbacks
 */
var {clockLimit, time} = require("./time")
var icon = require("./icon")
var counter = require("./counter")
var alarms = require("./alarms")

/**
 *  event dispatcher
 */
function alarmEventsDispatch(alarm) {
    switch (alarm.name) {
        case alarmWork.id:
            console.log(TAG + eventTAG + 'start break')
            counter.set(null, true)
            counter.restart()
            alarms.set(alarmBreak.id)
            icon.set(alarmBreak.id)
            browser.notifications.create(alarmBreak.id, notificationParams)
            break;

        case alarmBreak.id:
            console.log(TAG + eventTAG + 'start work')
            counter.set(null, false)
            counter.restart()
            alarms.set(alarmWork.id)
            icon.set(alarmWork.id)
            break;

        case alarmCounter.id:
            counter.update(alarmCounter.interval)
            counter.carry()
            counter.sync()
            break;
    }
}

/**
 *  business logic
 */
// start work-alarm
alarms.set(alarmWork.id)

// start time counter
counter.start()

// start response any request
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    var msg = {
        time,
        reversed: counter.reversed
    }
    switch (request.type) {
        case 'requestTime':
            sendResponse(msg)
            break;
        case 'resetCounter':
            alarms.reload()
            counter.restart()
            sendResponse(msg)
            break;
    }
    return true;
})

// start response alarm events
browser.alarms.onAlarm.addListener(alarmEventsDispatch)

// reset alarms when setting changes
browser.storage.onChanged.addListener((changes, area) => {
    if (area === 'local') {
        console.log(TAG + 'storage changed')
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
