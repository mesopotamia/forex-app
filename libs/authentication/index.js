var express = require("express"),
    router = express.Router(),
    jwt = require("jsonwebtoken"),
    mongoose = require("mongoose"),
    User = require("../../models/user");

router.get("/generate", function (req, res) {
    var userModel = new User();
    userModel.email = "req.body.email";
    userModel.password = "req.body.password";
    userModel.save(function(err, user) {
        user.token = jwt.sign(user, "random123");
        user.save(function(err, user1) {
            res.json({
                type: true,
                data: user1,
                token: user1.token
            });
        });
    });
});
router.post("/signup", function (req, res, next) {
    var email = req.body && req.body.email || null;
    var password = req.body && req.body.password || null;
    if(!validateCredentials(email, password)){
        res.json({
            type: false,
            data: "invalid credentials"
        });
    }

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
}, createUser);

function validateCredentials (email, password) {
    if(password && email){
        return true;
    }
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
function hasToken (req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
};

function isAuthenticated (req, res, next) {

};
module.exports = router;
