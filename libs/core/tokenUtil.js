var jwt = require('jsonwebtoken');

module.exports = {
    getToken: function (req) {
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            return bearerToken;
        }
    },
    getID: function (token) {
        return jwt.decode(token);
    }
}
