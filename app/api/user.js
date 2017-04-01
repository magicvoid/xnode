var router = require('express').Router();
var log = require('log')
var User = require('db').collection('user')

router.get('/', function (req, res) {
    log.info('user log!')
    User.findOne({ username: 'magicvoid' }, function (err, user) {
        res.send('User api home page' + ' name:' + user.username);
    })
});

module.exports = router