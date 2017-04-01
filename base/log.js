var colors = require('colors')
var config = require(__dirname + '/config.js')
var log = require('tracer').colorConsole({
    level: config.log.level,
    format: [
        "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})", //default format 
        {
            error: "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}" // error format 
        }
    ],
    dateformat: "HH:MM:ss.L",
    preprocess: function (data) {
        data.title = data.title.toUpperCase();
    },
    filters: [
        {
            debug: colors.gray,
            warn: colors.yellow,
            error: [colors.red]
        }
    ]
})

module.exports = log
require(__dirname + '/modules').define('log', log)