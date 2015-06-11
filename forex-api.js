var express = require('express'),
    router = express.Router(),
    forex = require('./forex'),
    session = require('./libs/core/session');

router.use(session());

router.get('/instruments', function (req, res) {
    forex.getQuotes(function (body) {
        res.end(body);
    });
});
router.get('/', function (req, res) {
    res.send('You\'re in!');
});

module.exports = router;
