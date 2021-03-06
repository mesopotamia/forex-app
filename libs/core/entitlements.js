var util = require('./responseUtil'),
    responses = require('./responses'),
    User = require('../../models/user'),
    tokenUtil = require('./tokenUtil'),
    responseUtil = require('./responseUtil');

var entitlement = function (req, res, next) {

    var token = tokenUtil.getToken(req);
    var id = tokenUtil.getID(token);
    User.findOne({_id: id}, function (err, record) {
        if(err){
            util.send(res, responses.GLOBAL_ERROR);
        }
        if(record){
            next();
        }
        else{
            responseUtil.send(res, responses.INVALID_TOKEN);
        }
    });
};

var superEntitlement = function (req, res, next) {
    var token = tokenUtil.getToken(req);
    var id = tokenUtil.getID(token);
    User.findOne({_id: id}, function (err, record) {
        if(err){
            util.send(res, responses.GLOBAL_ERROR);
        }
        if(record.role !== 'super'){
            util.send(res, responses.NOT_ENTITLED);
        }
        return next();
    });
};

module.exports = {
    entitlement: entitlement,
    superEntitlement: superEntitlement
};
