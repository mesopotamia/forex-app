var express = require('express');
var router = express.Router();
var forex = require('./forex');

router.get('/instruments', function (req, res) {
    forex.getQuotes(function (body) {
        res.end(body);
    });
});
router.get('/', function (req, res) {
    res.end('main instruments endpoint');
});

module.exports = router;
