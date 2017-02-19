const {handleError} = require("../utility")

function formatTime(time) {
    let s = []
    for (let key in time) {
        if (time.hasOwnProperty(key)) {
            if (key === 'days' && time[key] === 0) {
                continue
            }
            let prefix = time[key] >= 10 ? '' : '0'
            s.push(prefix + time[key])
        }
    }
    return s.join(':')
}

var clock = {
    dom: null,
    reversed: false,
    locate: () => {
        clock.dom = document.querySelector(".item.time")
    },
    update: (msg) => {
        clock.dom.innerHTML = formatTime(msg.time)

        if (clock.reversed !== msg.reversed) {
            clock.dom.classList.toggle('warning', clock.reversed = msg.reversed)
        }
        return true;
    },
    request: () => {
        browser.runtime.sendMessage({ type: 'requestTime' }).then(clock.update, handleError)
    },
    reset: () => {
        browser.runtime.sendMessage({ type: 'resetCounter' }).then(clock.update, handleError)
    }
}

module.exports = clock