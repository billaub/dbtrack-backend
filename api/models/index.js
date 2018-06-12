let sequelize = require("../util/sequelize");
let user = require('./user');
let track = require('./track');

user.hasMany(track);
user.belongsToMany(user, {as: "subscription", through: 'subscriptions'});

module.exports = sequelize.sync({force: true});