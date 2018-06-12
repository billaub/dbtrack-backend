"use strict";
let passport = require('passport');

module.exports = function (app) {
    let tracks = require('../controllers/tracksController');
    let users  = require('../controllers/userController');

    app.route('/tracks')
        .get(tracks.get_all)
        .post(tracks.post_track);

    app.route('/users')
        .get(users.get_all_users);

    app.route('/auth/register')
        .post(users.register);

    app.route('/auth/login')
        .post(users.login);

    app.route('/subscribe')
        .post(users.add_subscription);
};