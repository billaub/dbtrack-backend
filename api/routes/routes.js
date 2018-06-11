"use strict";

module.exports = function (app) {
    let tracks = require('../controllers/tracksController');
    let users  = require('../controllers/userController');

    app.route('/tracks')
        .get(tracks.get_all)
        .post(tracks.post_track);

    app.route('/auth/register')
        .post(users.register);

    app.route('/auth/login')
        .post(users.login);
};