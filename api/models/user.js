'use strict';
let Sequelize = require("sequelize");
let sequelize = require("../util/sequelize");


let model = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
});

module.exports = model;