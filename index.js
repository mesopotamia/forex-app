var express = require("express"),
    app = express(),
    rates = require("./libs/rates"),
    headers = require("./libs/core/headers"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    auth = require("./libs/authentication"),
    usersAPI = require("./api/users");

mongoose.connect("mongodb://localhost/test");

app.use(headers());
app.use(bodyParser.urlencoded());

app.use("/api", usersAPI);
app.use("/rates", rates);
app.use("/auth", bodyParser.urlencoded({ extended: true }), auth);

app.get("/", function (req, res) {
    res.send("Welcome to my forex app");
})

var server = app.listen(4000, function () {
  console.log("App running");
});

process.on('uncaughtException', function(err) {
    console.log(err);
});
