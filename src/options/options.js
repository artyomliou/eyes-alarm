const { getLocalString } = require("../utility")
var page = require('./page')
var nodes = require('./nodes')
var defaultValues = require('../configs/defaults')

var options = {
    save(e) {
        e.preventDefault()
        let data = page.inputs.get()
        let dom = page.inputs.dom()
        let timestamp = `[${data.last_modified}] `

        if (options.checkInputErrorExists(dom)) {
            options.msg('', false)
            return;
        }

        options.apply(timestamp, data)
    },
    reset(e) {
        e.preventDefault()

        let data = ({title, message, breakTimeAmount, readingTimeAmount} = defaultValues);
        let timestamp = data.last_modified = (new Date).toLocaleTimeString()

        options.apply(
            timestamp,
            data,
            function updateOptionsInputs() { page.inputs.set() }
        )
    },
    checkInputErrorExists(dom) {
        return dom.map(el => {

            if (el.attributes.type && el.attributes.type.value === "number") {
                return el.validity.rangeOverflow || el.validity.rangeUnderflow
                // returning True means that something is wrong
            } else {
                return false
                // so return False when checking a non-number input
            }

        }).filter(el => el).length
    },
    apply(timestamp, data, callback = undefined) {
        browser.storage.local.set(data)
            .then(() => {

                options.msg(timestamp + getLocalString('optionsApplySuccessMessage'), true)
                callback && callback()

            })
            .catch(err => {

                options.msg(timestamp + err.message, false)

            })
    },
    msg(text, isSuccess) {
        let n = nodes.getDOM('msg')
        n.innerText = text
        n.classList.toggle('success', isSuccess)
        n.classList.toggle('warning', !isSuccess)
    }
}

module.exports = options