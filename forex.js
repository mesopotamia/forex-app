var https = require('https');

// var url = "https://api-fxpractice.oanda.com/v1/instruments?'+'accountId=8672858'+'&instruments='";
var url = "api-fxpractice.oanda.com";
var pairs = encodeURIComponent(['AUD_CAD', 'USD_CAD', 'EUR_SEK'].join());
var token = 'Bearer cbb662a7231a7fbe349ae792b357cced-e211d66d5b8b217b334e720ecfa04f04';

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
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.on('data', function (chunk) {
          callback(chunk);
          console.log('BODY: ' + chunk);
      });
    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

    // req.end();
};

module.exports = {
    getQuotes: getQuotes
}
