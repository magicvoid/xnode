var process = require('process')
var natives_modules = process.binding("natives")

// Useage: 
// require('modules').define('xxxname',xxxobj) 
// Do not use in the components in /base because the load sequence is unknown
module.exports.define = function (module_name, obj) {
    if (natives_modules.hasOwnProperty(module_name)) {
        throw Error("Module Name has be defined")
    }
    var __module_uuid = +new Date + Math.random().toString(32)
    global[__module_uuid] = obj
    var scriptContent = 'module.exports = global["' + __module_uuid + '"]'
    natives_modules[module_name] = scriptContent
}
