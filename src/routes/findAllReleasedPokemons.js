const { Pokemon } = require('./../db/sequelize')

module.exports = (app) => {
    app.get('/api/available_pokemons', (req, res) => {
        Pokemon.findAll({
            attributes: ['pokemon_id', 'name'],
            order: [['pokemon_id', 'asc']]
        })
        .then(pokemons => {
            const message = 'Available pokemons have been successfully retrieved.'
            res.json({ message, data: pokemons })
        })
        .catch(error => {
            const message = `An error occured while retrieving pokemons.`
            res.status(500).json({ message, data: error })
        })
    })
}