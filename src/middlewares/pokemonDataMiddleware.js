const pokemons = require('./../data/pokemon_stats.json')

module.exports = (req, res, next) => {
    if (!pokemons || !pokemons.length) {
        return res.status(404).json({ message: 'Sorry, there are no pokemons available.' })
    }
    next()
}