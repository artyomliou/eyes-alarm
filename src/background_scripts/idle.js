const {TAG} = require("../tags")
const {alarmWork} = require("../configs/alarms")
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
                    console.log(TAG + idle.TAG + 're-activate...')
                    alarms.start(alarmWork.id)
                    clock.start()
                    isLocked = false
                }
                break;
            case 'locked':
                console.log(TAG + idle.TAG + 'system locked, stop and reset...')
                clock.stop()
                alarms.stop()

                // reset ui and data
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