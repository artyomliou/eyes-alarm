const {alarmWork, alarmBreak} = require("../configs/alarms")

var icon = {
    TAG: '[Icon] ',
    set: (name) => {
        if (name === alarmWork.id) {
            browser.browserAction.setIcon({ path: "icons/set-timer-button.png" })
        } else if (name === alarmBreak.id) {
            browser.browserAction.setIcon({ path: "icons/set-timer-button-red.png" })
        }
    }
}

module.exports = icon