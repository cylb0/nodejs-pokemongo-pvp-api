const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('./../models/pokemon')
const UserModel = require('./../models/user')
let pokemons = require('./../data/mock')

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
        timezone: 'Etc/GMT-2'
    },
    logging: true
})

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDB = () => {
    return sequelize.sync({force: true}).then(_ => {
        console.log('pokemons : ',pokemons)
        pokemons.map(pokemon => {
            Pokemon.create({
                pokemon_id: pokemon.pokemon_id,
                name: pokemon.name,
                form: pokemon.form,
                base_attack: pokemon.base_attack,
                base_defense: pokemon.base_defense,
                base_stamina: pokemon.base_stamina
            })
        })

        User.create({
            username: 'cylb',
            password: '$2a$12$.7L0Craftt563.QQgfDILeSdBW/A/K/KF3IOm7qIKFb14X3jjrrwC'
        })

    })
    .then(_ => console.log('La base de données a bien été initialisée.'))
}

module.exports = { initDB, Pokemon, User }