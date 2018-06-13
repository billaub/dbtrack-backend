"use strict";
let passport = require('passport');

module.exports = function (app) {
    let tracks = require('../controllers/tracksController');
    let users  = require('../controllers/userController');

    app.route('/tracks')
        .get(tracks.get_all)
        .post(tracks.post_track);

    app.route('/subscribe/tracks')
        .get(tracks.get_tracks_from_subscription);

    app.route('/users')
        .get(users.get_all_users);

    app.route('/auth/register')
        .post(users.register);

    app.route('/auth/login')
        .post(users.login);

    app.route('/subscribe')
        .post(users.add_subscription);

    app.route('/subscriptions')
        .get(users.get_subscriptions);

    app.route('/subscriptions/remove')
        .post(users.remove_subscription);
};