const { formatTime } = require("../utility")

var clock = {
    dom: null,
    request() {
        browser.runtime.sendMessage({ type: 'requestTime' })
            .then(clock.update)
            .catch(err => { console.error(err) })
    },
    reset() {
        browser.runtime.sendMessage({ type: 'resetCounter' })
            .then(clock.update)
            .catch(err => { console.error(err) })
    },

    update(msg) {
        if (typeof msg === 'object') {
            if (!clock.dom) {
                clock.dom = document.querySelector("#monitor")
            }
            let remain = msg.limit - msg.time
            clock.dom.innerText = formatTime(remain)
            clock.dom.classList.toggle('warning', !msg.reading)
        }
        return true;
    }
}

module.exports = clock