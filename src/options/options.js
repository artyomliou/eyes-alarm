var page = require('./page')
var nodes = require('./nodes')

var options = {
    save(e) {
        e.preventDefault()
        try {
            browser.storage.local.set(page.inputs.get())
                .then(() => {
                    nodes.getDOM('apply_msg').classList.toggle('hidden', false)
                    nodes.getDOM('error_msg').innerText = ''
                })
                .catch(err => {
                    throw err;
                })
        } catch (e) {
            nodes.getDOM('apply_msg').classList.toggle('hidden', true)
            nodes.getDOM('error_msg').innerText += e.message
        }
    }
}

module.exports = options