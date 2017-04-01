var router = require('express').Router();

router.get('/', function (req, res) {
    res.send('This is an example');
});

module.exports = router