const {alarmWork, alarmBreak} = require("../configs/alarms")

var icon = {
    TAG: '[Icon] ',
    paths: {
        [alarmWork.id]: "icons/set-timer-button.png",
        [alarmBreak.id]: "icons/set-timer-button-red.png"
    },
    set: (id) => {
        browser.browserAction.setIcon({
            path: icon.paths[id]
        })
    }
}

module.exports = icon