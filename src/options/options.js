const { getLocalString } = require("../utility")
var page = require('./page')
var nodes = require('./nodes')

var options = {
    save(e) {
        e.preventDefault()
        let data = page.inputs.get()
        let time = data.last_modified

        browser.storage.local.set(data)
            .then(() => {
                nodes.getDOM('apply_msg').innerText = `[${time}] ` + getLocalString('optionsApplySuccessMessage')
                nodes.getDOM('error_msg').innerText = ''
            })
            .catch(err => {
                nodes.getDOM('apply_msg').innerText = ''
                nodes.getDOM('error_msg').innerText = `[${time}] ${err.message}`
            })
    }
}

module.exports = options