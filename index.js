var express = require('express'),
    app = express(),
    forexapi = require('./forex-api');

app.use('/forex', forexapi);

app.get('/', function (req, res) {
    res.send('Welcome to my forex app');
})

var server = app.listen(3000, function () {
  console.log('App running');
});
