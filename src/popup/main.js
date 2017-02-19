require("../styles/popup_entry.less")
const {TAG, eventTAG} = require("../extension_tag")
var clock = require("./clock")

/**
 *  window event
 */
window.onload = () => {
    clock.locate()
    clock.request()
    browser.runtime.onMessage.addListener(clock.update)
}

window.onunload = () => {
    browser.runtime.onMessage.removeListener(clock.update)
}

document.querySelector('#refresh_button').addEventListener('click', clock.reset)

document.querySelector('#options_button').addEventListener('click', e => {
    e.preventDefault()
    browser.runtime.openOptionsPage()
})