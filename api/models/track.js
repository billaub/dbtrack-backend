'use strict';
const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    let Track = sequelize.define('tracks', {
        title: DataTypes.STRING,
        url: DataTypes.STRING,
        name: DataTypes.STRING,
        platform: DataTypes.STRING,
    });

    return Track
};