var defaultSoundPath = require('file-loader!../178646__zabuhailo__bronzebell1.wav')
var audioElement = new Audio(defaultSoundPath)

audioElement.preload = true
audioElement.loop = false

module.exports = {
  audioElement,
  defaultSoundPath
}