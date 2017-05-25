require("../styles/options_entry.sass")
var options = require('./options')
var page = require('./page')
var nodes = require('./nodes')

document.addEventListener("DOMContentLoaded", page.render);
nodes.getDOM("apply").addEventListener("click", options.save);
nodes.getDOM("reset").addEventListener("click", options.reset);
nodes.getDOM("soundEnabled").addEventListener("click", options.switchSelectButtonStatus);