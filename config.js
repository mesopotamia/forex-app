var fs = require('fs');

var config = {},
    fxtrade = {};

// load fxtrade user credentials
fs.readFile('./fxtrade', function (error, data) {
    if(error){
        // TODO log config error
        throw error;
    }
    else{
        var data = JSON.parse(data);
        fxtrade.host = data.host;
        fxtrade.accountId = data.accountId;
        fxtrade.token = data.token;
        
        fxtrade.apiVersion = '/v1/';
        fxtrade.prices = fxtrade.apiVersion + 'prices?accountId=' + fxtrade.accountId + '&instruments=';
        fxtrade.instruments = fxtrade.apiVersion + 'instruments?accountId=' + fxtrade.accountId;
    }
});


config.fxtrade = fxtrade;

module.exports = config;
