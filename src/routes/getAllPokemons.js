const pokemons = require('./../data/pokemon_stats.json')
const pokedex = require('./../data/pokedex')
const regionalForms = ["Normal", "Alola", "Galarian", "Hisuian"]
const checkPokemonsData = require('./../middlewares/pokemonDataMiddleware')

module.exports = (app) => {
    app.get('/api/pokemon', checkPokemonsData, (req, res) => {
        
        const filteredPokemon = pokedex(pokemons, regionalForms)

        if (req.query.id && req.query.name) {
            return res.status(400).json({ message: 'Please provide either an "id" or a "name," but not both.' });
        }

        if (req.query.id) {
            getPokemonByID(req, res, filteredPokemon) 
        } else if (req.query.name) {
            getPokemonByName(req, res, filteredPokemon)
        } else {
            const message = `Complete list of all ${filteredPokemon.length} released pokemons has been found.`
            res.json({ message, data: filteredPokemon })
        }
    })
    
    function getPokemonByID(req, res, filteredPokemon) {
        const id = parseInt(req.query.id)
        const matchingPokemons = filteredPokemon.filter(pokemon => pokemon.pokemon_id === id)
        const message = `${matchingPokemons.length} pokemon${matchingPokemons.length !== 1 ? 's' : ''} matching the id ${id}.`
        res.json({ message, data: matchingPokemons })
    }

    function getPokemonByName(req, res, filteredPokemon) {
        const name = req.query.name
        const matchingPokemons = filteredPokemon.filter(pokemon => pokemon.pokemon_name === name)
        const message = `${matchingPokemons.length} pokemon${matchingPokemons.length !== 1 ? 's' : ''} matching the name ${name}.`
        res.json({ message, data: matchingPokemons })
    }
}