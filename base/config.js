var config = require('node-yaml-config').load(__dirname + '/../config/default.yml')

module.exports = config
require(__dirname + '/modules').define('config', config)