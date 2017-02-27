const {TAG} = require("../tags")
const {alarmWork} = require("../configs/alarms")
const {log} = require("../utility")
var alarms = require("./alarms")
var clock = require("./clock")
var notice = require("./notice")
var icon = require("./icon")

var isLocked = false

var idle = {
    TAG: '[idle] ',
    setInterval: (val) => {
        browser.idle.setDetectionInterval(val)
    },
    dispatch: state => {
        switch (state) {
            case 'active':
                if (isLocked) {
                    log(TAG + idle.TAG + 're-activate...')
                    alarms.start(alarmWork.id)
                    clock.start()
                    isLocked = false
                }
                break;
            case 'locked':
                log(TAG + idle.TAG + 'stop counters...')
                clock.stop()
                alarms.stopAll()

                log(TAG + idle.TAG + 'reset ui...')
                icon.set(alarmWork.id)
                notice.clear()
                clock.reverse(false)
                clock.ui.sync()
                
                isLocked = true
                break;
        }
    },
    detect: {
        start: () => {
            browser.idle.onStateChanged.addListener(idle.dispatch)
        },
        stop: () => {
            browser.idle.onStateChanged.removeListener(idle.dispatch)
        }
    }
}

module.exports = idle