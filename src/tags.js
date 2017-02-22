const {getLocalString} = require('./utility')
const extensionName = getLocalString("extensionName")
const TAG = '[' + extensionName + '] '
const eventTAG = '[event] '
module.exports = {
    TAG,
    eventTAG
}