var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 4000);

process.on('uncaughtException', function(err) {
    console.log(err);
});
