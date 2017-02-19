const {alarmWork, alarmBreak} = require("../configs/alarms")
const {handleError} = require("../utility")
const {workTimeKey, breakTimeKey} = require("../configs/times")
const {TAG} = require("../extension_tag")
var counter = require("./counter")

var alarms = {
    TAG: '[Alarms] ',
    create: (id, delayInMinutes) => {
        browser.alarms.create(id, {
            delayInMinutes
        })
    },
    loadThenCreate: (key, params) => {
        browser.storage.local.get(key).then(result => {

            let delay = result[key] || params.interval
            alarms.create(params.id, delay)

            if (params.id === alarmBreak.id) {
                counter.set(delay)
            }
            counter.sync()
        }, handleError)
    },
    set: (name) => {
        switch (name) {
            case alarmWork.id:
                alarms.loadThenCreate(workTimeKey, alarmWork)
                break;

            case alarmBreak.id:
                alarms.loadThenCreate(breakTimeKey, alarmBreak)
                break;
        }
    },
    reload: () => {
        console.log(TAG + alarms.TAG + 'reload...')
        browser.alarms.getAll().then(allAlarms => {
            let names = allAlarms.map(alarm => alarm.name)

            if (names.includes(alarmWork.id)) {
                alarms.set(alarmWork.id)
            } else if (names.includes(alarmBreak.id)) {
                alarms.set(alarmBreak.id)
            }
        })
    }
}

module.exports = alarms