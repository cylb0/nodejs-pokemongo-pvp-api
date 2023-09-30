const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('./../models/pokemon')
let pokemons = require('./../data/mock')

const sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2'
    },
    logging: true
})

const Pokemon = PokemonModel(sequelize, DataTypes)

const initDB = () => {
    return sequelize.sync({force: true}).then(_ => {
        console.log('pokemons : ',pokemons)
        pokemons.map(pokemon => {
            Pokemon.create({
                pokemon_id: pokemon.pokemon_id,
                en_name: pokemon.en_name,
                fr_name: pokemon.fr_name,
                form: pokemon.form,
                base_attack: pokemon.base_attack,
                base_defense: pokemon.base_defense,
                base_stamina: pokemon.base_stamina
            })
        })
    })
    .then(_ => console.log('La base de données a bien été initialisée.'))
}

module.exports = { initDB, Pokemon }