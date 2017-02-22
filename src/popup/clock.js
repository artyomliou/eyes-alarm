const {handleError, formatTime} = require("../utility")

var clock = {
    dom: null,
    reversed: false,
    request: () => {
        browser.runtime.sendMessage({ type: 'requestTime' }).then(clock.ui.update, handleError)
    },
    reset: () => {
        browser.runtime.sendMessage({ type: 'resetCounter' }).then(clock.ui.update, handleError)
    },

    ui: {
        locate: () => {
            if (!clock.dom) {
                clock.dom = document.querySelector(".item.time")
            }
        },
        update: (msg) => {
            clock.ui.locate()
            clock.dom.innerHTML = formatTime(msg.time)

            if (clock.reversed !== msg.reversed) {
                clock.dom.classList.toggle('warning', clock.reversed = msg.reversed)
            }
            return true;
        }
    }
}

module.exports = clock