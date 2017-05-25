var storage = require("./storage")
var timePacket = require("./timePacket")
var paths = require("../configs/paths")
var defaultValues = require("../configs/defaults")
var defaultSoundPath = require('file-loader!../178646__zabuhailo__bronzebell1.wav')

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
            ui.notice.checkCustomDataExists(['soundEnabled', 'soundPath'], (keys, result) => {
                if (result.soundEnabled) {
                    ui.sound.play(result.soundPath)
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
        /**
         * if user doesnt specify the sound to play, play default one
         * if user specified a path, play it
         * @param {String} specifiedPath 
         */
        judgePath (specifiedPath = '') {
            try {
                new URL(specifiedPath)
                return specifiedPath
            } catch (e) {
                return defaultSoundPath
            }
        },
        /**
         * Audio contructor accept a URLString
         * means that it will try to download the file
         * @param {String} specifiedPath 
         */
        play (specifiedPath) {
            try {
                let executablePath = ui.sound.judgePath(specifiedPath)
                let audio = new Audio(executablePath)
                audio.play()
            } catch (err) {
                console.log(err)
            }            
        }
    }
}

module.exports = ui