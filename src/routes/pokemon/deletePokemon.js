const { Pokemon } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.delete('/api/pokemon/:id', auth, (req, res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            if(pokemon === null) {
                const message = `This pokemon doesn't exist. Please try again with another id.`
                return res.status(404).json({message})
            }
            const deletedPokemon = pokemon
            Pokemon.destroy({
                where: { pokemon_id: pokemon.pokemon_id }
            })
            .then(_ => {
                const message = `#${deletedPokemon.pokemon_id} ${deletedPokemon.pokemon_name} has been successfully deleted.`
                res.json({ message, data: deletedPokemon })
            })
            .catch(error => {
                console.error('Unhandled Error:', error.message, error.stack);
                const message = `The pokemon couldn't be deleted, please try again in a few minutes.`
                res.status(500).json({ message, data: error })
            })
        })
    })
}