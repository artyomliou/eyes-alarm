const workTimeKey = 'work_time'
const breakTimeKey = 'break_time'
const keys = [workTimeKey, breakTimeKey]

const defaultValues = {
    [workTimeKey]: 50,
    [breakTimeKey]: 10
}

module.exports = {
    workTimeKey,
    breakTimeKey,
    keys,
    defaultValues
}