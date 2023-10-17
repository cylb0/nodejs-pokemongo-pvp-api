const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('./../models/pokemon')
const FormModel = require('./../models/form')
const EvolutionModel = require('./../models/evolution')
const UserModel = require('./../models/user')
const { pokemons, forms } = require('./../data/mock')

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        timezone: 'Etc/GMT-2'
    },
    logging: true
})

const Pokemon = PokemonModel(sequelize, DataTypes)
const Form = FormModel(sequelize, DataTypes)
const Evolution = EvolutionModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

Pokemon.hasMany(Form, {
    foreignKey: 'pokemonId',
    onDelete: 'CASCADE'
})
Form.belongsTo(Pokemon, {
    foreignKey: 'pokemonId',
    onDelete: 'CASCADE'
})

Form.hasMany(Evolution, {
    foreignKey: 'fromId',
    onDelete: 'CASCADE'
})
Form.hasMany(Evolution, {
    foreignKey: 'toId',
    onDelete: 'CASCADE'
})
Evolution.belongsTo(Form, {
    foreignKey: 'fromId',
    onDelete: 'CASCADE'
})
Evolution.belongsTo(Form, {
    foreignKey: 'toId',
    onDelete: 'CASCADE'
})

const initDB = () => {
    return sequelize.sync(
        // {force: true}
        ).then(_ => {

        // pokemons.map(pokemon => {
        //     Pokemon.create({
        //         pokemon_id: pokemon.pokemon_id,
        //         pokemon_name: pokemon.pokemon_name,
        //         pokemon_name_fr: pokemon.pokemon_name_fr
        //     })
        // })

        // forms.map(form => {
        //     Form.create({
        //         pokemonId: form.pokemonId,
        //         form: form.form,
        //         base_attack: form.base_attack,
        //         base_defense: form.base_defense,
        //         base_stamina: form.base_stamina
        //     })
        // })

        // User.create({
        //     username: 'cylb',
        //     password: '$2a$12$.7L0Craftt563.QQgfDILeSdBW/A/K/KF3IOm7qIKFb14X3jjrrwC'
        // })

    })
    .then(_ => console.log('La base de données a bien été initialisée.'))
}

module.exports = { initDB, Pokemon, Form, Evolution, User }