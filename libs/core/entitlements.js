var util = require('./responseUtil');
var responses = require('./responses');
var jwt = require('jsonwebtoken');
var User = require('../../models/user');

var entitlement = function (req, res, next) {
    var token = getToken(req);
    var id = jwt.decode(token);
    User.findOne(id, function (err, record) {
        if(err){
            util.send(res, responses.GLOBAL_ERROR);
        }
        next();
    });
};

var superEntitlement = function (req, res, next) {
    var token = getToken(req);
    var id = jwt.decode(token);
    User.findOne({_id: id}, function (err, record) {
        if(err){
            util.send(res, responses.globalError);
        }
        if(record.role !== 'super'){
            util.send(res, responses.NOT_ENTITLED);
        }
        return next();
    });
};

var getToken = function (req) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        return bearerToken;
    }
};

module.exports = {
    entitlement: entitlement,
    superEntitlement: superEntitlement
};
