require("../styles/options_entry.less")
var options = require('./options')
var page = require('./page')
var nodes = require('./nodes')

document.addEventListener("DOMContentLoaded", page.render);
nodes.getDOM("apply").addEventListener("click", options.save);