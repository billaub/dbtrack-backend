'use strict';

let bcrypt = require('bcryptjs');
let db = require('../models/index');
let jwt = require('jsonwebtoken');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy; /* this should be after passport*/

exports.register = function(req, res, next) {
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err)
            {
                console.log(err);
                return next(err);
            }
            db.user.findOne({
                where: {username: req.body.username}
            }).then((user) => {
                if (user !== null)
                    return res.status(403).send({"Error": "This user already exists"})
            });
            db.user.create({
                username: req.body.username,
                password: hash
            }).then(() => {
                res.sendStatus(201)
            }).catch((err) => {
                return next(err)
            });

        });
    });
};

exports.login = function(req, res, next) {
    db.user.findOne({
        where: {username: req.body.username}
    }).then((user) => {
        if( !user ){
            res.status(401).json({message:"no such user found"});
        }
        bcrypt.compare(req.body.password, user.password)
            .then((result) => {
                if (result)
                {
                    let payload = {id: user.id};
                    let token = jwt.sign(payload, "dbtrack");
                    res.json({message: "ok", token: token});
                }
                else {
                    res.status(401).json({message:"passwords did not match"});
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
};

exports.get_all_users = function(req, res, next) {
    db.user.findAll()
        .then((users) => res.send(users))
        .catch((err) => console.log(err))
};

exports.add_subscription = function (req, res, next) {
    db.user.findOne({
        where: {id: req.body.id}
    }).then((user) => {
        if (user) {
            req.user.addSubscription(user)
                .then(() => console.log("added subscription"))
                .catch((err) => console.log(err));
        }
    }).catch((err) => {
        console.log(err);
    })
};