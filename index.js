var express = require('express'),
    app = express(),
    rates = require('./libs/rates');

app.use('/rates', rates);

app.get('/', function (req, res) {
    res.send('Welcome to my forex app');
})

var server = app.listen(3000, function () {
  console.log('App running');
});
