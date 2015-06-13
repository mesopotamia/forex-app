var router = require("express").Router(),
    jwt = require("jsonwebtoken"),
    mongoose = require("mongoose"),
    User = require("../../models/user");

router.post("*", validateCredentials, checkExisting, createUser);

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

function validateCredentials (req, res, next) {
    var email = req.body && req.body.email || null;
    var password = req.body && req.body.password || null;
    if(!password || !email){
        res.json({
            type: false,
            data: "invalid credentials"
        });
    }
    next();
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

            user.token = jwt.sign(user, "shhhhh");
            user.save(function(err, user1) {
                res.json({
                    type: true,
                    data: user1,
                    token: user1.token
                });
            });
        });
    }
}

module.exports = router;
