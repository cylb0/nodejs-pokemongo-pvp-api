const pokemons = require('./../data/pokemon_stats.json')

module.exports = (app) => {
    app.get('/api/pokemon', (req, res) => {
        if(pokemons){
            const regionalForms = ["Normal", "Alola", "Galarian", "Hisuian"]
            const filteredPokemons = pokemons.filter(pokemon => regionalForms.includes(pokemon.form))
            const message = `Complete list of all ${Object.keys(filteredPokemons).length} released pokemons has been found.`
            res.json({ message, data: filteredPokemons })
        } else {
            const message = `Ressource doesn't exist.`
            res.status(404).json({ message })
        }
    })
}