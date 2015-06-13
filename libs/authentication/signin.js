var router = require("express").Router(),
    jwt = require("jsonwebtoken"),
    mongoose = require("mongoose"),
    User = require("../../models/user");

router.post("*", checkValidUser);

function checkValidUser (req, res, next) {
    var email = req.body && req.body.email || null;
    var password = req.body && req.body.password || null;
    User.findOne({email: email, password: password}, function (err, user) {

        if (err) { res.json({type: false, data: err}); }

        if (user) {
            res.status(200).json({
                type: true,
                data: user
            });
        }

        else{
            res.status(401).json({
                type: false,
                data: "User does not exist"
            });
        }
    });
};

module.exports = router;
