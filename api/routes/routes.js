"use strict";

module.exports() = function (app) {
    var tracks = require('../controllers/tracksController')

    app.route('/tracks')
        .get(tracks.get_all)
        .post(tracks.post_track);
}