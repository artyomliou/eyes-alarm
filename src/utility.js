const env = require("./configs/env")

function handleError(err) {
    console.error(err);
}

function handleResponse(r) {
    console.info(r)
}

function toTitleCase(word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
}

function getLocalString(key) {
    return browser.i18n.getMessage(key)
}

function log(s) {
    if (env.debugMode) {
        console.log(s)
    }
}

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

module.exports = {
    handleResponse,
    handleError,
    toTitleCase,
    getLocalString,
    log,
    formatTime
}