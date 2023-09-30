const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('pokedex', 'username', 'password', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2'
    },
    logging: true
})