require("../styles/popup_entry.less")
const {TAG, eventTAG} = require("../tags")
var clock = require("./clock")

/**
 *  window event
 */
window.onload = () => {
    browser.runtime.onMessage.addListener(clock.ui.update)
    clock.request()

    document.querySelector('#refresh_button').addEventListener('click', clock.reset)

    document.querySelector('#options_button').addEventListener('click', e => {
        e.preventDefault()
        browser.runtime.openOptionsPage()
    })
}

window.onunload = () => {
    browser.runtime.onMessage.removeListener(clock.ui.update)
}