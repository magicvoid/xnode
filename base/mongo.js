var mongo = require('mongoskin')
var config = require(__dirname + '/config')

var db = mongo.db(config.mongodb.url)

module.exports.db = db
require(__dirname + '/modules').define('db', db)
