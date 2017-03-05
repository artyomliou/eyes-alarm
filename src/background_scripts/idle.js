var ui = require("./ui")
var clock = require("./clock")
var counter = require("./counter")

var isLocked = false

var idle = {
    setInterval: (val) => {
        browser.idle.setDetectionInterval(val)
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
                    
                    isLocked = false
                }
                break;
            case 'locked':
                counter.stop()
                ui.notice.clear()
                ui.icon.switch(true)
                ui.clock.switch(true)
                ui.clock.sync()
                
                isLocked = true
                break;
        }
    }
}

module.exports = idle