const {
    workTimeKey,
    breakTimeKey,
    keys,
    defaultValues} = require("../configs/times")

const alarmWork = {
    id: 'alarmWork',
    interval: defaultValues[workTimeKey]
}
const alarmBreak = {
    id: 'alarmBreak',
    interval: defaultValues[breakTimeKey]
}
const alarmCounter = {
    id: 'alarmCounter',
    interval: 1
}
const alarmClockUpdate = {
    id: 'alarmClockUpdate',
    interval: 1
}

module.exports = {
    alarmWork,
    alarmBreak,
    alarmCounter,
    alarmClockUpdate
}