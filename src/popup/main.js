require("../styles/popup_entry.sass")
var clock = require("./clock")


document.querySelector('#refresh_button').addEventListener('click', clock.reset)

document.querySelector('#options_button').addEventListener('click', e => {
    e.preventDefault()
    browser.runtime.openOptionsPage()
})

window.addEventListener("load", function (event) {
    browser.runtime.onMessage.addListener(clock.update)
    clock.request()
})

window.addEventListener("unload", function (event) {
    browser.runtime.onMessage.removeListener(clock.update)
})