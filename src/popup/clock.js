const { formatTime } = require("../utility")

var clock = {
    dom: null,
    request() {
        browser.runtime.sendMessage({ type: 'requestTime' })
            .then(clock.update, err => { console.error(err) })
    },
    reset() {
        browser.runtime.sendMessage({ type: 'resetCounter' })
            .then(clock.update, err => { console.error(err) })
    },

    update(msg) {
        if (typeof msg !== 'object') {
            return;
        } else {
            if (!clock.dom) {
                clock.dom = document.querySelector("#monitor")
            }
            clock.dom.innerHTML = formatTime(msg.time)
            clock.dom.classList.toggle('warning', !msg.reading)
            return true;
        }

    }
}

module.exports = clock