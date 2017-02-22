function handleError(err) {
    console.error(err);
}

function toTitleCase(word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
}

function getLocalString(key) {
    return browser.i18n.getMessage(key)
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
    handleError,
    toTitleCase,
    getLocalString,
    formatTime
}