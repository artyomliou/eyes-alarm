var storage = require("./storage")

var clock = {
    reset() {
        storage.store.passedMinutes = 0
    },
    plus(number) {
        storage.store.passedMinutes += number
    }
}

module.exports = clock