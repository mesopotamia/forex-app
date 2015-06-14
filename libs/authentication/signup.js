var router = require("express").Router(),
    mongoose = require("mongoose"),
    User = require("../../models/user"),
    util = require("./util");

router.post("*", util.validateCredentials, checkExisting, createUser);

function checkExisting (req, res, next) {
    var email = req.body && req.body.email || null;
    var password = req.body && req.body.password || null;
    User.findOne({email: email, password: password}, function (err, user) {

        if (err) { res.json({type: false, data: err}); }

        if (user) {
            res.json({
                type: false,
                data: "User already exists"
            });
        }
        else{
            next();
        }
    });
};

function createUser (req, res, next) {
    var email = req.body && req.body.email || null;
    var password = req.body && req.body.password || null;
    if(password && email){

        var userModel = new User();

        userModel.email = email;
        userModel.password = password;
        userModel.save(function(err, user) {

            if (err) { res.json({type: false, data: err}); }

            user.save(function(err, user1) {
                res.json({
                    type: true,
                    data: user1
                });
            });
        });
    }
}

module.exports = router;
