const {alarmWork, alarmBreak, alarmKeys} = require("../configs/alarms")
const {handleError, log} = require('../utility')
const {TAG} = require("../tags")

var setting = {
    TAG: '[setting] ',
    store: {
        [alarmWork.id]: alarmWork.interval,
        [alarmBreak.id]: alarmBreak.interval,
        idleDetectionInterval: alarmBreak.interval * 60
    },

    get(id) {
        return setting.store[id]
    },
    load({callback, params}) {
        browser.storage.local.get(Object.keys(setting.store)).then(result => {
            for (let key in result) {
                setting.store[key] = result[key]
            }
            log(TAG + setting.TAG + 'setting loaded')
            if (callback) {
                callback(params)
            }
        }, handleError)
    }
}

module.exports = setting