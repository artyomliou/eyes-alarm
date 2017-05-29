var ui = require("./ui")
var clock = require("./clock")
var counter = require("./counter")
var audioElement = require("./audioElement")

var isLocked = false

var idle = {
    init(val) {
        browser.idle.setDetectionInterval(val);
    },
    detect: {
        start: () => {
            browser.idle.onStateChanged.addListener(idle.dispatch)
        }
    },
    dispatch: state => {
        switch (state) {
            case 'active':
                if (isLocked) {
                    audioElement.muted = false
                    counter.start()
                    //ui.icon.switch(true)
                    ui.clock.switch(true)
                    ui.clock.sync()
                    isLocked = false
                }
                break;
            case 'idle':
            case 'locked':
                audioElement.muted = true
                counter.stop()
                ui.notice.clear()
                clock.reset()
                isLocked = true
                break;
        }
    }
}

module.exports = idle