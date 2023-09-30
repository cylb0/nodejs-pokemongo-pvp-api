const { Pokemon } = require('./../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemon/:id', (req, res) => {
        Pokemon.findByPk(req.params.id)
            .then(pokemon => {
                if(pokemon === null) {
                    const message = `This pokemon doesn't exist. Please try again with another id.`
                    return res.status(404).json({message})
                }
                const message = `#${pokemon.pokemon_id} ${pokemon.en_name} has been found.`
                res.json({ message, data: pokemon })
            })
            .catch(error => {
                const message = `The pokemon couldn't be retrieved, please try again in a few minutes.`
                res.status(500).json({ message, data: error })
            })
    })
}