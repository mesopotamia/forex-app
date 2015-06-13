var express = require("express"),
    router = express.Router(),
    signup = require("./signup"),
    signin = require("./signin");

router.post("/signup", signup);
router.post("/signin", signin);


module.exports = router;
