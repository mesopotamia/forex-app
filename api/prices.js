var router = require('express').Router(),
    User = require('../models/user'),
    jwt = require('jsonwebtoken'),
    entitlement = require('../libs/core/entitlements').entitlement,
    superEntitlement = require('../libs/core/entitlements').superEntitlement,
    util = require('../libs/core/tokenUtil'),
    responses = require('../libs/core/responses'),
    responseUtil = require('../libs/core/responseUtil'),
    config = require('../config'),
    request = require('request');

router
    .route('/prices')
        .get(entitlement, getPrices);

function getPrices (req, res) {

    var options = {
        url: config.fxtrade.host + config.fxtrade.prices + req.query.instruments,
        headers: {
            Authorization: config.fxtrade.token
        }
    };
    console.log(config.fxtrade.host + config.fxtrade.prices + req.query.instruments);
    request(options, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            res.json({data: body});
        }
        responseUtil.send(res, responses.GLOBAL_ERROR);
    })
};

module.exports = router;
