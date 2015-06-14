var express = require("express"),
    router = express.Router(),
    signup = require("./signup"),
    signin = require("./signin"),
    authenticate = require("./authenticate");


router.post("/signup", signup);

router.post("/signin", signin);

router.post("/authenticate", authenticate);
router.get("/authenticate", authenticate);



module.exports = router;
