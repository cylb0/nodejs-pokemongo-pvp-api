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
            // getPokemonByID(req, res, filteredPokemon) 
            getPokemonByProperty(req, res, 'pokemon_id', req.query.id, filteredPokemon)
        } else if (req.query.name) {
            getPokemonByProperty(req, res, 'pokemon_name', req.query.name, filteredPokemon)
        } else {
            const message = `Complete list of all ${filteredPokemon.length} released pokemons has been found.`
            res.json({ message, data: filteredPokemon })
        }
    })

    function getPokemonByProperty(req, res, property, value, filteredPokemon) {
        const matchingPokemons = filteredPokemon.filter(pokemon => pokemon[property] == value)                                                                                          
        if (matchingPokemons.length === 0) {
            return res.status(404).json({ message: `No pokemon found for ${property} ${value}` })
        }
        
        if (req.query.form) {
            getPokemonByForm(req, res, matchingPokemons)
        } else {
            const message = `${matchingPokemons.length} pokemon${matchingPokemons.length !== 1 ? 's' : ''} matching the ${property} ${value}.`
            res.json({ message, data: matchingPokemons })
        }
    }

    function getPokemonByForm(req, res, matchingPokemons) {
        const form = req.query.form
        if (!regionalForms.includes(form)) {
            res.status(404).json({ message: `This form is invalid. Please provide a valid form : ${regionalForms.join(', ')}` })
        }
        const matchingPokemon = matchingPokemons.filter(pokemon => pokemon.form === form)
        if (matchingPokemon.length) {
            const message = `#${matchingPokemon[0].pokemon_id} ${matchingPokemon[0].pokemon_name} has been found.`
            res.json({ message, data: matchingPokemon })
        } else {
            const message = `This form is unavailable for this pokemon.`
            res.json({ message })
        }
    }
}