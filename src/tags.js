const {getLocalString} = require('./utility')

function outputEmbracedTag(tag) {
    return `[${tag}] `
}

const tags = {
    ext: outputEmbracedTag(getLocalString("extensionName")),
    event: outputEmbracedTag('Event'),
    ui: outputEmbracedTag('UI'),
    setting: outputEmbracedTag('Setting'),
    clock: outputEmbracedTag('Clock')
}

module.exports = tags