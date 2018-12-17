let Sequelize = require("sequelize");

let sequelize = new Sequelize('dbtrack', 'power_user', 'pfee', {
    host: process.env.result,
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
