let Sequelize = require("sequelize");

let sequelize = new Sequelize('dbtrack', 'power_user', 'pfee', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

module.exports = sequelize;
