const {alarmWork, alarmBreak, alarmKeys} = require("../configs/alarms")
const {handleError, log} = require("../utility")
const {TAG} = require("../tags")
var setting = require("./setting")

var alarms = {
    TAG: '[Alarms] ',
    keys: alarmKeys,

    getAll() {
        return browser.alarms.getAll()
            .then(allAlarms => allAlarms.map(el => el.name))
            .then(names => names.filter(el => alarms.keys.includes(el.name)))
    },
    start(id) {
        log(TAG + alarms.TAG + `start... ${id}`)
        let delayInMinutes = setting.get(id)

        browser.alarms.create(id, {
            delayInMinutes
        })
    },
    stop(id) {
        log(TAG + alarms.TAG + `stop... ${id}`)
        browser.alarms.clear(id)
    },
    stopAll() {
        alarms.getAll().then(names => {
            names.map(name => {
                alarms.stop(name)
            })
        })
    },
    restart() {
        alarms.getAll().then(names => {
            names.map(name => {
                alarms.stop(name)
                alarms.start(name)
            })
        })
    }
}

module.exports = alarms