const {TAG} = require("../tags")
const {alarmKeys, getLocalString} = require("../configs/alarms")

var page = require('./page')

var options = {
    TAG: '[options] ',
    dom: {},

    getDOM(key) {
        if (options.dom.hasOwnProperty(key)) {
            return options.dom[key]
        } else {
            return options.dom[key] = document.querySelector(key)
        }
    },

    save(e) {
        e.preventDefault()
        console.log(TAG + options.TAG + 'save...')
        try {
            browser.storage.local.set(page.columns.get())
            options.getDOM('#apply_msg').classList.toggle('hidden', false)
        } catch(e) {
            options.getDOM('#apply_msg').classList.toggle('hidden', true)
            options.getDOM('#error_msg').innerText += e.message
        }
    }
}

module.exports = options