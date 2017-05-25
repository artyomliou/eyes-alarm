var storage = require("./storage")
var timePacket = require("./timePacket")
var paths = require("../configs/paths")
var defaultValues = require("../configs/defaults")
const defaultSoundURL = require("file-loader!../178646__zabuhailo__bronzebell1.wav")

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
        checkCustomDataExists(keys, callback) {
            browser.storage.local.get(keys)
                .then(result => {
                    callback(keys, result)
                })
        },
        create() {
            ui.notice.checkCustomDataExists(['title', 'message'], (keys, result) => {
                // rewrite data for creating notification
                keys.forEach(key => {
                    if (result[key]) {
                        notificationParams[key] = result[key]
                    }
                })

                // creating
                browser.notifications.create(notificationID, notificationParams)
            })
            ui.notice.checkCustomDataExists(['soundEnabled', 'customSoundURL'], (keys, result) => {
                if (result.soundEnabled) {
                    sound.play(result.customSoundURL)
                }
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
    },
    sound: {
        play (url = '') {
            try {
                if (url) {
                    (new Audio(url)).play()
                } else {
                    (new Audio(defaultSoundURL)).play()
                }
            }
            catch (err) {
                console.error(err)
            }
        }
    }
}

module.exports = ui