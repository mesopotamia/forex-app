var express = require('express'),
    app = express(),
    forexapi = require('./forex-api');

app.use('/forex', forexapi);


var server = app.listen(3000, function () {
  console.log('App running');
});
