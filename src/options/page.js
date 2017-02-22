const {TAG} = require("../tags")
const {toTitleCase, getLocalString, handleError} = require("../utility")
const {alarmWork, alarmBreak, alarmKeys} = require("../configs/alarms")

function getInterval(key) {
    switch (key) {
        case alarmWork.id:
            return alarmWork.interval;
        case alarmBreak.id:
            return alarmBreak.interval;
        default:
            return null;
    }
}

var nodes = {
    pool: {},
    getDOM(key) {
        if (nodes.pool.hasOwnProperty(key)) {
            return nodes.pool[key]
        } else {
            return nodes.pool[key] = document.querySelector('#' + key)
        }
    }
}

var page = {
    TAG: '[options] ',
    reflect: {
        alarmWork_label: 'WorkTimeLabel',
        alarmBreak_label: 'BreakTimeLabel',
        apply: 'ApplyButton',
        apply_msg: 'ApplySuccessMessage'
    },
    render() {
        console.log(TAG + page.TAG + 'render...')
        browser.storage.local.get(alarmKeys).then(page.columns.set, handleError)

        Object.keys(page.reflect).forEach(key => {
            nodes.getDOM(key).innerText = getLocalString('options' + page.reflect[key])
        })
    },
    columns: {
        pool: {},
        set(result) {
            alarmKeys.forEach(key => {
                let val = result[key] || getInterval(key);
                if (val) {
                    nodes.getDOM(key).value = val
                }
            })
        },
        get() {
            let set = {}
            alarmKeys.forEach(key => {
                set[key] = parseInt(nodes.getDOM(key).value)
            })
            return set
        }
    }
}

module.exports = page