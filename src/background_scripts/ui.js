var paths = require("../configs/paths")
var storage = require("./storage")

const noticeParams = {
    type: 'basic',
    iconUrl: browser.extension.getURL(paths.notificationIcon),
    title: browser.i18n.getMessage("notificationTitle"),
    message: browser.i18n.getMessage("notificationContent")
}

const notificationID = 'eyes-alarm-n'

var ui = {
    icon: {
        switch(isGreen) {
            /*
            let path = isGreen ? paths.greenButton : paths.redButton
            browser.browserAction.setIcon({ path })
            */
        }
    },
    notice: {
        create() {
            browser.notifications.create(notificationID, noticeParams)
        },
        clear() {
            browser.notifications.clear(notificationID)
        }
    },
    clock: {
        switch(isGreen) {
            storage.store.isReading = isGreen
        },
        sync() {
            if (browser.extension.getViews({ type: "popup" }).length) {
                browser.runtime.sendMessage({
                    time: storage.store.passedMinutes,
                    reading: storage.store.isReading
                }).catch(err => { console.error(err) })
            }
        }
    }
}

module.exports = ui