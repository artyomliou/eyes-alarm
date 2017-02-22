const {alarmWork, alarmBreak, alarmKeys} = require("../configs/alarms")
const {handleError} = require("../utility")
const {TAG} = require("../tags")
var setting = require("./setting")

var alarms = {
    TAG: '[Alarms] ',

    start(id) {
        let delayInMinutes = setting.get(id)

        browser.alarms.create(id, {
            delayInMinutes
        })
    },
    stop() {
        console.log(TAG + alarms.TAG + 'stop...')
        browser.alarms.clearAll()
    },
    reload() {
        setting.load({
            callback: alarms.restart
        })
    },
    restart() {
        console.log(TAG + alarms.TAG + 'restart...')
        browser.alarms.getAll()
            .then(allAlarms => allAlarms.map(alarm => alarm.name))
            .then(names => {

                browser.alarms.clearAll()
                names.forEach(name => {
                    alarms.start(name)
                })
            })
    }
}

module.exports = alarms