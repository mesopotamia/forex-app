var https = require('https'),
    url = "api-fxpractice.oanda.com",
    pairs = encodeURIComponent(['AUD_CAD', 'USD_CAD', 'EUR_SEK'].join()),
    token = 'Bearer cbb662a7231a7fbe349ae792b357cced-e211d66d5b8b217b334e720ecfa04f04';

var getQuotes = function (callback) {

    var options = {
        hostname: url,
        port: 443,
        path: "/v1/instruments?accountId=8672858&instruments="+pairs,
        method: 'GET',
        headers: {
          Authorization: token
        }
    };

    var req = https.get(options, function(res) {
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            callback(chunk);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
};

module.exports = {
    getQuotes: getQuotes
}
