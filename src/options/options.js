const { getLocalString } = require("../utility")
var page = require('./page')
var nodes = require('./nodes')
var defaultValues = require('../configs/defaults')

var options = {
    /**
     * gather data from all specified columns
     * (specify by storageKeys of page.js)
     * then save them
     * @param {Event} e 
     */
    save(e) {
        page.button.loading.toggle(true) // animation
        e.preventDefault()
        
        let data = page.inputs.get()
        let dom = page.inputs.dom()
        let timestamp = `[${data.last_modified}] `
        let stopLoadingAnimation = page.button.loading.toggleFactory(false)

        if (options.checkInputErrorExists(dom)) {
            options.msg('', false)
            return;
        }

        options.apply(timestamp, data, stopLoadingAnimation, stopLoadingAnimation)
    },
    /**
     * 重設所有欄位
     * @param {Event} e 
     */
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
    /**
     * 根據input type 檢查資料是否合乎要求
     * @param {*} dom 
     */
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
    /**
     * save data into local storage
     * @param {String} timestamp 
     * @param {Object} data 
     * @param {Function} successCallback 
     * @param {Function} failCallback
     */
    apply(timestamp, data, successCallback = undefined, failCallback = undefined) {
        
        browser.storage.local.set(data)
            .then(() => {
                options.msg(timestamp + getLocalString('optionsApplySuccessMessage'), true)
                successCallback && successCallback()
            })
            .catch(err => {
                options.msg(timestamp + err.message, false)
                failCallback && failCallback()
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