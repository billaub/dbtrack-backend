'use strict';

let db = require('../models/index');

exports.get_all = function(req, res) {
    res.json("OK get");
};

exports.post_track = function(req, res) {
    if (!(req.body.title && req.body.url && req.body.name && req.body.platform))
        res.status(400).send({"Error": "Bad request"});
    db.tracks.create({
        title: req.body.title,
        url: req.body.url,
        platform: req.body.platform,
        user: req.user
    }).then((track) => res.status(201).send(track)).catch((err) => console.log(err));
};