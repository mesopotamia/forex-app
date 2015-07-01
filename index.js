var express = require("express"),
    app = express(),
    rates = require("./libs/rates"),
    headers = require("./libs/core/headers"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    usersAPI = require("./api/users"),
    pricesAPI = require('./api/prices');

mongoose.connect("mongodb://localhost/test");

app.use(headers());
app.use(bodyParser.json());

app.use("/api", usersAPI, pricesAPI);
app.use("/rates", rates);

app.get("/", function (req, res) {
    res.send("Welcome to my forex app");
})

var server = app.listen(4000, function () {
  console.log("App running");
});

process.on('uncaughtException', function(err) {
    console.log(err);
});
