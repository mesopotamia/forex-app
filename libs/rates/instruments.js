var express = require('express'),
    router = express.Router(),
    util = require('./util');

router.get('/instruments', function (req, res) {
    util.getQuotes(function (body) {
        res.end(body);
    });
});
router.get('/', function (req, res) {
    res.send('You\'re in!');
});

module.exports = router;
