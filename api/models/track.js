'use strict';
let Sequelize = require("sequelize");
let sequelize = require("../util/sequelize");

let track = sequelize.define('tracks', {
    title: Sequelize.STRING,
    url: Sequelize.STRING,
    platform: Sequelize.STRING,
});

module.exports = track;