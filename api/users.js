var router = require('express').Router(),
    mongoose = require('mongoose'),
    User = require('../models/user'),
    jwt = require('jsonwebtoken');

router
    .route('/users')
        .post(postUsers)
        .get(getUsers);
router
    .route('/user')
        .post(postUser);

router
    .route('user/:userid')
        .get(getUser)
        .put(updateUser)
        .delete(deleteUser);

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
                token: jwt.sign(record.email, 'shhhhx4')
            });
        }
        else {
            res.status(401).json({
                data: "User could not be found"
            });
        }
    })
}

function getUser () {};
function updateUser () {};
function deleteUser () {};

module.exports = router;
