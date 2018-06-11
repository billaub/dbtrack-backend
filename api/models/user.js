'use strict';
const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define('user', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
    });

    return User
};