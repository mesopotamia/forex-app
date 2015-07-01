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
router
    .route('/instruments')
        .get(entitlement, getInstruments);

function getPrices (req, res) {
    makeFxtradeRequest(res, config.fxtrade.prices, req.query.instruments);
};
function getInstruments (req, res) {
    makeFxtradeRequest(res, config.fxtrade.instruments)
}

function makeFxtradeRequest (res, endpoint, params) {

    params = params || '';
    var options = {
        url: config.fxtrade.host + endpoint + params,
        headers: {
            Authorization: config.fxtrade.token
        }
    };
    console.log(config.fxtrade.host + endpoint + params);
    request(options, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            console.log(body);
            res.json({
                data: body
            });
        }
        else {
            responseUtil.send(res, responses.GLOBAL_ERROR);
        }
    })
}

module.exports = router;
