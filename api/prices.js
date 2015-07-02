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

    params = encodeURIComponent(params.split(',').join()) || '';
    var options = {
        url: config.fxtrade.host + endpoint + params,
        headers: {
            Authorization: config.fxtrade.token
        }
    };
    console.log(config.fxtrade.host + endpoint + params);
    request(options, function (error, response, body) {

        if(error){
            responseUtil.send(res, responses.GLOBAL_ERROR);
            throw error;
        }

        if(response.statusCode == 200) {
            res.json({
                data: JSON.parse(body)
            });
        }
        else {
            responseUtil.send(res, responses.GLOBAL_ERROR);
            throw new Error(body);
        }
    })
}

module.exports = router;
