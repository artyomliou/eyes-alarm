const defaultValues = require('../configs/defaults')
const storageKeys = [
    'isReading',
    'passedMinutes',
    'breakTimeAmount',
    'readingTimeAmount',
    'idleDetectionInterval'
]

var storage = {
    store: {},

    load({callback, params}) {
        browser.storage.local.get(null)
            .then(result => {
                storageKeys.forEach(key => {
                    storage.store[key] = result[key] || defaultValues[key]
                })
                if (callback) {
                    callback(params)
                }
            })
            .catch(err => {
                console.error(err)
            })
    }
}

module.exports = storage