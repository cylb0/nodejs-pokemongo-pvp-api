let pokemons = require('./../data/released_pokemon.json')

module.exports = (app) => {
    app.get('/api/pokemon/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const pokemon = pokemons[id]
        if (pokemon) {
            const message = `${pokemon.name} has been found.`
            res.json({ message, data: pokemon })
        } else {
            const message = `Pokemon with id ${id} doesn't exist.`
            res.status(404).json({ message })
        }
    })
}