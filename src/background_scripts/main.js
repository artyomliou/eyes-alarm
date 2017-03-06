const { handleResponse } = require('../utility')
var ui = require("./ui")
var idle = require("./idle")
var clock = require("./clock")
var counter = require("./counter")
var storage = require("./storage")

/**
 *  callbacks
 */
function resetUI(iconIsGreen) {
    clock.reset()
    ui.icon.switch(iconIsGreen)
    ui.clock.switch(iconIsGreen)
    ui.clock.sync()
}

function shouldRead() {
    return   ! storage.store.isReading
            && storage.store.passedMinutes >= storage.store.breakTimeAmount
}

function shouldBreak() {
    return storage.store.isReading
        && storage.store.passedMinutes >= storage.store.readingTimeAmount
}

function updateClock() {
    clock.plus(1)
    ui.clock.sync()
}

// dispatch alarm event
browser.alarms.onAlarm.addListener(alarm => {
    updateClock()
    if (shouldBreak()) {
        counter.restart()
        resetUI(false)
    } else if (shouldRead()) {
        counter.restart()
        resetUI(true)
        ui.notice.create()
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
            counter.restart()
            resetUI(true)
            break;
    }
    if (browser.extension.getViews({ type: "popup" }).length) {
        var messageFormat = {
            time: storage.store.passedMinutes,
            reading: storage.store.isReading
        }
        browser.runtime.sendMessage(messageFormat).catch(err => { console.error(err) })
    }
    return true;
})

// reset alarms when setting changes
browser.storage.onChanged.addListener((changes, area) => {
    if (area === 'local') {
        storage.load({
            callback: () => {
                counter.restart()
                resetUI(true)
            }
        })
    }
})

/**
 *  business logic
 */
storage.load({
    callback: () => {
        idle.detect.start()
        counter.start()
    }
})