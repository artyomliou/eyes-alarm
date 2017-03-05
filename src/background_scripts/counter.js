var counter = {
    start() {
        browser.alarms.create('eyes-alarm-counter', {
            periodInMinutes: 1
        })
    },
    stop() {
        browser.alarms.clear('eyes-alarm-counter')
    },
    restart() {
        counter.stop()
        counter.start()
    }
}

module.exports = counter