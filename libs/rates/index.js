var express = require('express'),
    router = express.Router(),
    session = require('../core/session'),
    instruments = require('./instruments');

router.use(session());

router.get('/instruments', instruments);

router.get('/', function (req, res) {
    res.send('You\'re in!');
});

module.exports = router;
