var router = require("express").Router()
    jwt = require("jsonwebtoken");
    util = require("./util"),
    User = require("../../models/user");


router.get("*", util.normalizeToken, authenticate);
router.post("*", util.normalizeToken, authenticate);

function authenticate (req, res, next) {

    try {
        var decoded = jwt.verify(req.token, "shhhh");
        var payload;
        User.findOne(decoded, function (err, user) {

            if(err){
                throw err;
            }

            if (user) {
                res.json({
                    data: user
                });
            }
            else {
                res.status(403).json({
                    data: "User could not be found"
                });
            }
        });
    }
    catch (e) {
        res.status(403).json({
            data: e
        });
    }

};

module.exports = router;
