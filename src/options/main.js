require("../styles/options_entry.less")
var options = require('./options')
var page = require('./page')

document.addEventListener("DOMContentLoaded", page.render);
document.querySelector("#apply").addEventListener("click", options.save);