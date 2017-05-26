const env = require("./configs/env")

function handleResponse(r) {
    console.info(r)
}

function log(...args) {
    if (env.debugMode) {
        console.log(args.reduce((acc, val) => acc + val, ''))
    }
}

/**
 * baNANA => Banana
 * @param {String} word 
 */
function toTitleCase(word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
}

/**
 * retrieve localized string
 * @param {String} key 
 */
function getLocalString(key) {
    return browser.i18n.getMessage(key)
}

/**
 * format time to [12:00] style
 * @param {Number} minutes 
 */
function formatTime(minutes) {
    if (!Number.isInteger(minutes)) {
        console.error(`input time [${minutes}] is not integer`)
        return 'ERROR'
    }
    let formatted = []
    let hour = 0
    if (minutes >= 60) {
        do {
            minutes -= 60;
            hour += 1;
        } while (minutes >= 60)
    }
    formatted.push(hour, minutes)
    return formatted.map(el => padTime(el)).join(':')
}

/**
 * accept a number
 * if it's less than 10, pad it with zero
 * @param {Number} val 
 */
function padTime(val) {
    return (val < 10) ? `0${val}` : val
}

module.exports = {
    handleResponse,
    toTitleCase,
    getLocalString,
    log,
    formatTime
}