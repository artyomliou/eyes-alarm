var {clockLimit, time} = require("./time")
const {alarmCounter} = require("../configs/alarms")

var counter = {
    TAG: '[Counter] ',
    units: ['mins', 'hours', 'days'],
    reversed: false,

    start: () => {
        browser.alarms.create(alarmCounter.id, {
            periodInMinutes: alarmCounter.interval
        })
    },

    restart: () => {
        browser.alarms.clear(alarmCounter.id)
        counter.start()
        counter.reset()
    },

    reset: () => {
        for (let key in time) {
            if (time.hasOwnProperty(key)) {
                time[key] = 0
            }
        }
    },

    set: (number = null, isReversed = null) => {
        if (number !== null) {
            time.mins = number
        }
        if (isReversed !== null) {
            counter.reversed = isReversed
        }
    },

    update: (number) => {
        if (counter.reversed) {
            time.mins -= number;
        } else {
            time.mins += number;
        }
    },

    sync: () => {
        if (browser.extension.getViews({type: "popup"}).length) {
            browser.runtime.sendMessage({
                time,
                reversed: counter.reversed
            })
        }
    },

    carry: () => {
        counter.units.forEach((unit, index, list) => {

            let exceeds = time[unit] >= clockLimit[unit];
            let nextUnitExists = list.indexOf(index + 1) !== -1;

            if (exceeds && nextUnitExists) {
                let nextUnit = list[index + 1];
                time[unit] = 0
                time[nextUnit]++;
            }
        })
    }
}

module.exports = counter