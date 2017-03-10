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
    return !storage.store.isReading
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
        resetUI(false) // turn to red
        ui.notice.create()
    } else if (shouldRead()) {
        counter.restart()
        resetUI(true) // turn to green
    }
})

// start dispatch request

function timeResponse() {
    return {
        time: storage.store.passedMinutes,
        reading: storage.store.isReading
    }
}
browser.runtime.onMessage.addListener((request, sender) => {
    switch (request.type) {

        case 'requestTime':
            return Promise.resolve(timeResponse())

        case 'resetCounter':
            counter.restart()
            resetUI(true)
            return Promise.resolve(timeResponse())
    }
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
        idle.init(storage.store.idleDetectionInterval)
        idle.detect.start()
        counter.start()
    }
})