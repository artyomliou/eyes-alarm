require("../styles/options_entry.less")
const {TAG} = require("../extension_tag")
const {keys, defaultValues} = require("../configs/times")
const {handleError} = require("../utility")
const applyLabelKey = 'apply'
const optionsPrefix = 'options'
const labelPrefix = '#'
const labelSuffix = '_label'

/**
 *  callbacks
 */
function toTitleCase(word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
}

var page = {

    renderLocalLabels: () => {
        let copy = keys.slice()
        copy.push(applyLabelKey)

        copy.forEach(el => {
            let key = el + labelSuffix
            let domKey = labelPrefix + key
            let stringKey = optionsPrefix + key.split('_').map(toTitleCase).join('')

            let string = browser.i18n.getMessage(stringKey)
            document.querySelector(domKey).innerText = string
        })
    },

    setColumns: (result) => {
        keys.forEach(key => {
            let val = ''
            if (result.hasOwnProperty(key) && result[key]) {
                val = result[key]
            } else {
                val = defaultValues[key]
            }
            document.querySelector("#" + key).value = val;
        })
    },

    getColumns: () => {
        let set = {}
        keys.forEach(key => {
            let val = document.querySelector("#" + key).value
            set[key] = parseInt(val)
        })
        return set
    }
}
var options = {
    TAG: '[options] ',

    restore: () => {
        console.log(TAG + options.TAG + 'restore...')
        browser.storage.local.get(keys).then(page.setColumns, handleError)
        page.renderLocalLabels()
    },

    save: (e) => {
        e.preventDefault()
        console.log(TAG + options.TAG + 'save...')
        browser.storage.local.set(page.getColumns())
    }
}

/**
 *  event handler
 */
document.addEventListener("DOMContentLoaded", options.restore);
document.querySelector("form button").addEventListener("click", options.save);