'use strict';

let tracks = require('../models/track');
//let sync = require('sync');

exports.get_all = function(req, res) {
    res.json("OK get");
};

exports.post_track = function(req, res) {
    if (!(req.body.title && req.body.url && req.body.platform))
        res.status(400).send({"Error": "Bad request"});
    tracks.create({
        title: req.body.title,
        url: req.body.url,
        platform: req.body.platform,
        userId: req.user.id
    }).then((track) => res.status(201).send(track)).catch((err) => console.log(err));
};

exports.get_tracks_from_subscription = function(req, res) {
    req.user.getSubscription().then(async (obj) => {
        let json = '{"tracks": ""}';
        for (let i = 0; i < obj.length; i++) {
            let user = obj[i];
            let t = await tracks.findAll({
                where: {userId: user.id}
            });
            for (let i = 0; i < t.length; i++) {
                let track = t[i];
                let obj = JSON.parse(json);
                let new_tracks = [...obj.tracks];
                new_tracks.push({
                    "title": track.title,
                    "platform": track.platform,
                    "url": track.url,
                    "user": user.username,
                });
                obj.tracks = new_tracks;
                json = JSON.stringify(obj);
            }
        }
        res.send(json);
    });
};