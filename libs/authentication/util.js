var hasToken = function (req, res, next) {
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

var validateCredentials = function (req, res, next) {
    var email = req.body && req.body.email || null;
    var password = req.body && req.body.password || null;
    if(!password || !email){
        res.status(400).json({
            type: false,
            data: "invalid credentials"
        });
    }
    next();
};

module.exports = {
    hasToken: hasToken,
    validateCredentials: validateCredentials
};
