var {clockLimit, time} = require("./time")
const {alarmCounter} = require("../configs/alarms")
const {handleError} = require("../utility")
const {TAG} = require("../tags")

var clock = {
    TAG: '[Counter] ',
    units: ['mins', 'hours', 'days'],
    reversed: false,
    id: alarmCounter.id,
    interval: alarmCounter.interval,
    skipLog: false,

    start() {
        browser.alarms.create(clock.id, {
            periodInMinutes: clock.interval
        })
    },
    stop() {
        console.log(TAG + clock.TAG + 'stop...')
        browser.alarms.clear(clock.id)
        clock.time.reset()
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
            if (clock.reversed) {
                time.mins -= number;
            } else {
                time.mins += number;
            }
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