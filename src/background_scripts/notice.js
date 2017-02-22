const {alarmBreak} = require("../configs/alarms")
const {TAG} = require("../tags")

const notificationParams = {
    type: 'basic',
    iconUrl: browser.extension.getURL("icons/notification.png"),
    title: browser.i18n.getMessage("notificationTitle"),
    message: browser.i18n.getMessage("notificationContent")
}

var notice = {
    TAG: '[notice] ',
    
    create() {
        browser.notifications.create(alarmBreak.id, notificationParams)
    },
    clear() {
        browser.notifications.clear(alarmBreak.id)
    }
}

module.exports = notice