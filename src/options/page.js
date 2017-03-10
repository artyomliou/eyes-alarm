const { toTitleCase, getLocalString } = require("../utility")
const defaultValues = require('../configs/defaults')
var nodes = require('./nodes')

const reflect = {
    /**
     * [dom key]: [locale string key]
     */
    readingTime_label: 'optionsWorkTimeLabel',
    breakTime_label: 'optionsBreakTimeLabel',
    apply: 'optionsApplyButton'
}
const storageKeys = [
    'breakTimeAmount',
    'readingTimeAmount'
]

var page = {
    render() {
        // input
        browser.storage.local.get(storageKeys)
            .then(page.inputs.set, err => { console.error(err) })

        // label
        for (var key in reflect) {
            nodes.getDOM(key).innerText = getLocalString(reflect[key])
        }
    },
    inputs: {
        set(result) {
            storageKeys.forEach(key => {
                nodes.getDOM(key).value = result[key] || defaultValues[key]
            })
        },
        get() {
            let set = {
                last_modified: (new Date).toLocaleTimeString()
            }
            storageKeys.forEach(key => {
                set[key] = parseInt(nodes.getDOM(key).value)
            })
            return set
        }
    }
}

module.exports = page