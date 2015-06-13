var express = require("express"),
    app = express(),
    rates = require("./libs/rates"),
    headers = require("./libs/core/headers"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    auth = require("./libs/authentication");

mongoose.connect("mongodb://localhost/test");

app.use(headers());

app.use("/rates", rates);
app.use("/auth", bodyParser.urlencoded({ extended: true }), auth);

app.get("/", function (req, res) {
    res.send("Welcome to my forex app");
})

var server = app.listen(3000, function () {
  console.log("App running");
});

process.on('uncaughtException', function(err) {
    console.log(err);
});
