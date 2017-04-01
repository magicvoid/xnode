var passport = require('passport')
var LocalStrategy = require('passport-local')
var db = require(__dirname + '/mongo').db
var log = require(__dirname + '/log')
var config = require(__dirname + '/config')

var User = db.collection('user')

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) throw err
            if (user != null) {
                if (user.password == password) {
                    return done(null, user)
                } else {
                    log.error('密码错误')
                    return done(null, false, { message: '密码错误' })
                }
            } else {
                log.error('用户不存在')
                return done(null, false, { message: '用户不存在' })
            }
        })
    }
))

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    return done(null, user)
})

passport.permissions = function authenticationMiddleware() {
    return function (req, res, next) {
        var requiredRole = parseRules(config.passport.rules, req)
        if (!requiredRole) {
            return next()
        }
        if (req.isAuthenticated()) {
            if (req.user.roles && req.user.roles.indexOf(requiredRole) != -1) {
                return next()
            } else {
                res.status(403).send('Not Allowed')
            }
        } else {
            res.status(401).send(null)
            // res.redirect('/user/login')
        }
    }
}

module.exports = passport
require(__dirname + '/modules').define('passport', passport)

function parseRules(rules, req) {
    var path = req.path
    for (var i = 0; i < rules.length; i++) {
        var rule = rules[i]
        if (rule.url == path) {
            return rule.role
        } else if (rule.url.endsWith('/**') && path.startsWith(rule.url.substring(0, rule.url.length - 3))) {
            return rule.role
        }
    }
    return null
}

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (prefix) {
        return this.slice(0, prefix.length) === prefix
    }
}
if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1
    }
}