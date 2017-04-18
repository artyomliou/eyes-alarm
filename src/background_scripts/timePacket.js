var storage = require("./storage")

var timePacket = () => {
    return {
        time: storage.store.passedMinutes,
        limit: storage.store.isReading ? storage.store.readingTimeAmount : storage.store.breakTimeAmount,
        reading: storage.store.isReading
    }
}

module.exports = timePacket