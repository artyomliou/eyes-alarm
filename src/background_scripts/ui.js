var storage = require("./storage")
var timePacket = require("./timePacket")
var {audioElement, defaultSoundPath} = require("./audioElement")
var paths = require("../configs/paths")
var defaultValues = require("../configs/defaults")

let notificationParams = {
    type: 'basic',
    iconUrl: browser.runtime.getURL(paths.notificationIcon),
    title: defaultValues.title,
    message: defaultValues.message
}
let notificationID = 'eyes-alarm-n'

var ui = {
    icon: {
        /**
         * once used to change the color of clock inside popup
         * @param {Boolean} isGreen 
         */
        switch(isGreen) {
            /*
            let path = isGreen ? paths.greenButton : paths.redButton
            browser.action.setIcon({ path })
            */
        }
    },
    notice: {
        /**
         * check some custom data if they existed
         * and passed them to callback for futher process
         * @param {Array} keys 
         * @param {Function} callback 
         */
        checkCustomDataExists(keys, callback) {
            browser.storage.local.get(keys).then(result => {
                callback(keys, result)
            })
        },
        /**
         * check if there it's some custom data to rewrite parameters used for showing notifiation
         * then check again, but this time is for playing sound
         */
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
            ui.notice.checkCustomDataExists(['soundEnabled', 'soundPath', 'soundVolume'], (keys, result) => {
                if (result.soundEnabled) {
                    ui.sound.play(result.soundPath, result.soundVolume)
                }
            })
        },
        /**
         * close notifcation
         */
        clear() {
            browser.notifications.clear(notificationID)
        }
    },
    clock: {
        /**
         * change storage.store.isReading
         * for indicating whether it's at reading mode
         * @param {Boolean} isGreen 
         */
        switch(isGreen) {
            storage.store.isReading = isGreen
        },
        /**
         * send time to popup from background_script
         */
        sync() {
            if (browser.extension.getViews({ type: "popup" }).length) {
                browser.runtime.sendMessage(timePacket()).catch(err => { console.error(err) })
            }
        }
    },
    sound: {
        /**
         * if user doesnt specify the path to play, play default one
         * if user specified a path, play it
         * @param {String} path 
         */
        updatePath (path = '') {
            if (path) {
                if (audioElement.src !== path) {
                    audioElement.src = path
                }
            } else if (audioElement.src !== defaultSoundPath) {
                audioElement.src = defaultSoundPath
            }
        },
        /**
         * set path and volume
         * then play
         * @param {String} path 
         */
        play (path, volume) {
            try {
                ui.sound.updatePath(path)
                audioElement.volume = volume
                audioElement.play()
            } catch (err) {
                console.error(err)
                console.log(audioElement)
            }            
        }
    }
}

module.exports = ui