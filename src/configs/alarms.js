const alarmWork = {
    id: 'alarmWork',
    interval: 50
}
const alarmBreak = {
    id: 'alarmBreak',
    interval: 10
}
const alarmCounter = {
    id: 'alarmCounter',
    interval: 1
}

/*
const alarmClockUpdate = {
    id: 'alarmClockUpdate',
    interval: 1
}
*/
const alarmKeys = [
    alarmWork.id,
    alarmBreak.id
]

module.exports = {
    alarmWork,
    alarmBreak,
    alarmCounter,
    alarmKeys
}