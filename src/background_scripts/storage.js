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
        browser.storage.local.get(Object.keys(storage.store))
            .then(result => {
                storageKeys.forEach(key => {
                    let val = result.hasOwnProperty(key) ? result[key] : defaultValues[key]
                    storage.store[key] = val
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