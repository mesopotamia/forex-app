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

module.exports = router;
