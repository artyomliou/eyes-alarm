var ui = require("./ui")
var clock = require("./clock")
var counter = require("./counter")

var isLocked = false

var idle = {
    init(val) {
        browser.idle.setDetectionInterval(val);
    },
    detect: {
        start: () => {
            browser.idle.onStateChanged.addListener(idle.dispatch)
        },
        stop: () => {
            browser.idle.onStateChanged.removeListener(idle.dispatch)
        }
    },
    dispatch: state => {
        switch (state) {
            case 'active':
                if (isLocked) {
                    counter.start()
                    ui.icon.switch(true)
                    ui.clock.switch(true)
                    ui.clock.sync()
                    isLocked = false
                }
                break;
            case 'idle':
            case 'locked':
                counter.stop()
                ui.notice.clear()
                isLocked = true
                break;
        }
    }
}

module.exports = idle