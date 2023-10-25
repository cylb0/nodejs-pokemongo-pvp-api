const { Pokemon } = require('./../../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemon_names.json', (req, res) => {
        Pokemon.findAll({
            attributes: ['pokemon_id', 'pokemon_name', 'pokemon_name_fr']
        })
            .then(pokemons => {
                return res.json(pokemons)
            })
            .catch((error) => {
                const message = `Couldn't retrieve data, please try again in a few minutes.`
                res.status(500).json({ message, data: error })
            })
    })
}