var storage = require("./storage")
var timePacket = require("./timePacket")
var paths = require("../configs/paths")
var defaultValues = require("../configs/defaults")

let notificationParams = {
    type: 'basic',
    iconUrl: browser.extension.getURL(paths.notificationIcon),
    title: defaultValues.title,
    message: defaultValues.message
}
let notificationID = 'eyes-alarm-n'

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
        checkCustomExists(callback) {
            let storageKeys = ['title', 'message']

            browser.storage.local.get(storageKeys)
                .then(result => {
                    storageKeys.forEach(key => {
                        if (result[key]) {
                            notificationParams[key] = result[key]
                        }
                    })
                    callback()
                })
        },
        create() {
            ui.notice.checkCustomExists(() => {
                browser.notifications.create(notificationID, notificationParams)
            })
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
                browser.runtime.sendMessage(timePacket()).catch(err => { console.error(err) })
            }
        }
    }
}

module.exports = ui