const pokemons = require('./../data/pokemon_stats.json')
const pokedex = require('./../data/pokedex')
const regionalForms = ["Normal", "Alola", "Galarian", "Hisuian"]

module.exports = (app) => {
    app.get('/api/pokemon/:id', (req, res) => {
        const id = parseInt(req.params.id)
        
        if (isNaN(id) || id < 1) {
            return res.status(400).json({ message: `"${req.params.id}" is not a valid pokemon ID. You must provide a positive integer as a pokemon ID.` })
        }

        if (pokemons.length) {
            const filteredPokemons = pokedex(pokemons, regionalForms)
            const matchingPokemons = filteredPokemons.filter(pokemon => pokemon.pokemon_id === id)
    
            if (matchingPokemons.length > 0) {
                const message = `#${id} ${matchingPokemons[0].pokemon_name} has been found.`
                res.json({ message, data: matchingPokemons })
            } else {
                const message = `Pokemon with id #${id} doesn't exist.`
                res.status(404).json({ message })
            }
        } else {
            const message = `Sorry there are no pokemons available.`
            res.status(404).json({ message })
        }
    })
}