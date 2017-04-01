var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var fs = require('fs')

var db = require(__dirname + '/base/mongo').db
var config = require(__dirname + '/base/config')
var log = require(__dirname + '/base/log')
var passport = require(__dirname + '/base/passport')

var app = express()
app.use(bodyParser.json())
app.use(session({
    secret: 'magic',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 //a week
    }
}))
app.use(passport.initialize())
app.use(passport.session())

var User = db.collection('user')
var Task = db.collection('task')

app.post('/login',
    passport.authenticate('local', {
        // successRedirect: '/task',
        // failureRedirect: '/'
    }), function (req, res) {
        res.send('success')
    });

app.get('/login',
    passport.authenticate('local', {
        successRedirect: '/task',
        failureRedirect: '/index'
    }));

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/index');
});

app.use(passport.permissions())

fs.readdirSync(__dirname + '/app/api/').forEach(function (filename) {
    var simplename = filename.substring(0, filename.length - 3)
    app.use('/' + simplename, require(__dirname + '/app/api/' + simplename))
});

var server = app.listen(config.server.port, function () {
    var host = server.address().address
    var port = server.address().port
    log.debug('debug')
    log.warn('warn')
    log.error('error')
    console.log('Example xtask-api listening at http://%s:%s', host, port)
})