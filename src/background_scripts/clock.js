var {clockLimit, time} = require("./time")
const {alarmCounter} = require("../configs/alarms")
const {handleResponse, handleError, log} = require("../utility")
const {TAG} = require("../tags")

var clock = {
    TAG: '[Counter] ',
    units: ['mins', 'hours', 'days'],
    reversed: false,
    id: alarmCounter.id,
    interval: alarmCounter.interval,
    skipLog: false,

    start() {
        log(TAG + clock.TAG + 'start...')
        browser.alarms.create(clock.id, {
            periodInMinutes: clock.interval
        })
    },
    stop() {
        log(TAG + clock.TAG + 'stop...')
        browser.alarms.clear(clock.id)
        clock.time.reset()
    },
    restart() {
        clock.stop()
        clock.start()
    },
    reverse(isReversed = false) {
        clock.reversed = isReversed
    },
    time: {
        set(number) {
            time.mins = number
        },
        reset() {
            for (let key in time) {
                time[key] = 0
            }
        },
        count(number) {
            time.mins += number;
        }
    },
    ui: {
        sync() {
            if (browser.extension.getViews({ type: "popup" }).length) {
                browser.runtime.sendMessage({
                    time,
                    reversed: clock.reversed
                }).catch(handleError)
            }
        }
    }
}

module.exports = clock