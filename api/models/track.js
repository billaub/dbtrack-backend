'use strict';
let Sequelize = require("sequelize");
let sequelize = require("../util/sequelize");

let model = sequelize.define('tracks', {
    title: Sequelize.STRING,
    url: Sequelize.STRING,
    name: Sequelize.STRING,
    platform: Sequelize.STRING,
});

module.exports = model;