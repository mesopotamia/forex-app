var router = require('express').Router(),
    User = require('../models/user'),
    jwt = require('jsonwebtoken'),
    entitlement = require('../libs/core/entitlements').entitlement,
    superEntitlement = require('../libs/core/entitlements').superEntitlement,
    util = require('../libs/core/tokenUtil'),
    responses = require('../libs/core/responses'),
    responseUtil = require('../libs/core/responseUtil');

router
    .route('/users')
        .post(postUsers)
        .get(superEntitlement, getUsers);
router
    .route('/user')
        .post(postUser)
        .get(getUserByToken);

router
    .route('user/:userid')
        .get(superEntitlement, getUser)
        .put(superEntitlement, updateUser)
        .delete(superEntitlement, deleteUser);

function postUsers (req, res) {
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.lastName = req.body.lastName;
    user.firstName = req.body.firstName;
    user.save(function(err, record) {

        if (err) { res.json({data: err}); }

        res.json({
            data: record
        });
    });

};

function getUsers (req, res) {
    User.find(function (error, records) {
        res.json(records);
    });
};

function postUser (req, res, next) {

    var email = req.body && req.body.email || null;
    var password = req.body && req.body.password || null;

    User.findOne({
        email: email,
        password: password
    }, function (error, record) {
        if(error){ res.json(error); }

        if(record){
            res.status(200).json({
                data: record,
                token: jwt.sign(record.id, 'shhhhx4')
            });
        }
        else {
            res.status(401).json({
                data: "User could not be found"
            });
        }
    })
}

function getUserByToken (req, res, next) {
    var id = util.getID(util.getToken(req));
    User.findOne({_id: id}, function (error, record) {
        if(error){
            responseUtil.send(responses.INVALID_TOKEN);
        }
        res.json({
            data: record
        });
    })

};
function getUser () {};
function updateUser () {};
function deleteUser () {};

module.exports = router;
