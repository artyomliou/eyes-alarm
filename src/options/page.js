const { toTitleCase, getLocalString } = require("../utility")
const defaultValues = require('../configs/defaults')
var nodes = require('./nodes')

// used to map a DOM's key to the locallized string
// to render the options page
const reflect = {
    // [dom key]: [locale string key]
    readingTime_label: 'optionsWorkTimeLabel',
    breakTime_label: 'optionsBreakTimeLabel',
    title_label: 'optionsNotificationTitleLabel',
    message_label: 'optionsNotificationMessageLabel',
    apply: 'optionsApplyButton',
    reset: 'optionsResetButton'
}

// used to retrieve data from specified nodes
const storageKeys = [
    'breakTimeAmount',
    'readingTimeAmount',
    'title',
    'message',
    'soundEnabled',
    'customSoundURL'
]

var page = {
    render() {
        page.labels.set()
        page.inputs.set()
    },
    labels: {
        set() {
            for (var key in reflect) {
                nodes.getDOM(key).innerText = getLocalString(reflect[key])
            }
        }
    },
    inputs: {
        set() {
            browser.storage.local.get(storageKeys)
                .then(result => {
                    storageKeys.forEach(key => {
                        nodes.getDOM(key).value = result[key] || defaultValues[key]
                    })
                })
                .catch(err => {
                    console.error(err)
                })
        },
        get() {
            let set = {
                last_modified: (new Date).toLocaleTimeString()
            }
            storageKeys.forEach(key => {
                let node = nodes.getDOM(key)
                let attrs = node.attributes
                if (attrs.type && attrs.type.value === 'number') {
                    set[key] = node.valueAsNumber
                } else {
                    set[key] = node.value
                }
            })
            return set
        },
        dom() {
            return Array.from(storageKeys.map(key => nodes.getDOM(key)))
        }
    }
}

module.exports = page