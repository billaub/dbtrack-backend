let sequelize = require("../util/sequelize");
let user = require('./user');
let track = require('./track');

user.hasMany(track);

sequelize.sync({force: true});