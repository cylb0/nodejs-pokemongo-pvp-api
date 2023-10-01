const { Pokemon } = require('./../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemon', (req, res) => {

        Pokemon.findAll({
            attributes: { exclude: ['id'] },
            order: [['pokemon_id', 'asc']]
        })  
            .then(pokemons => {
                const message = `Pokemons have been retrieved successfully.`
                res.json({ message, data: pokemons })
            })
            .catch(error => {
                const message = `An error occured while retrieving pokemons.`
                res.status(500).json({ message, data: error })
            })

        // const pokedexData = pokedex(pokemons, regionalForms)

        // if (req.query.id && req.query.name) {
        //     return res.status(400).json({ message: 'Please provide either an "id" or a "name," but not both.' });
        // }

        // if (req.query.id) {
        //     const id = req.query.id
        //     if (isNaN(id) || id <= 0) {
        //         res.status(404).json({ message: 'Invalid ID, please provide a positive integer as a pokemon ID.' })
        //     }
        //     getPokemonByProperty(req, res, 'pokemon_id', id, pokedexData)
        // } else if (req.query.name) {
        //     const name = req.query.name.charAt(0).toUpperCase() + req.query.name.slice(1).toLowerCase()
        //     getPokemonByProperty(req, res, 'pokemon_name', name, pokedexData)
        // } else {
        //     const message = `Complete list of all ${pokedexData.length} released pokemons has been found.`
        //     res.json({ message, data: pokedexData })
        // }
    })

    // function getPokemonByProperty(req, res, property, value, pokedexData) {
    //     const matchingPokemons = pokedexData.filter(pokemon => pokemon[property] == value)                                                                                          
    //     if (matchingPokemons.length === 0) {
    //         res.status(404).json({ message: `No pokemon found for ${property} ${value}` })
    //     }
        
    //     if (req.query.form) {
    //         getPokemonByForm(req, res, matchingPokemons)
    //     } else {
    //         const message = `${matchingPokemons.length} pokemon${matchingPokemons.length !== 1 ? 's' : ''} matching the ${property} ${value}.`
    //         res.json({ message, data: matchingPokemons })
    //     }
    // }

    // function getPokemonByForm(req, res, matchingPokemons) {
    //     const form = req.query.form
    //     if (!regionalForms.includes(form)) {
    //         res.status(404).json({ message: `This form is invalid. Please provide a valid form : ${regionalForms.join(', ')}` })
    //     }
    //     const matchingPokemon = matchingPokemons.filter(pokemon => pokemon.form === form)
    //     if (matchingPokemon.length) {
    //         const message = `#${matchingPokemon[0].pokemon_id} ${matchingPokemon[0].pokemon_name} has been found.`
    //         res.json({ message, data: matchingPokemon })
    //     } else {
    //         const message = `This form is unavailable for ${req.query.name}.`
    //         res.json({ message })
    //     }
    // }
}