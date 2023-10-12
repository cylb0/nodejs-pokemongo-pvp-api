const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Evolution } = require('../../db/sequelize')
const { Pokemon } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/api/evolution', auth, async (req, res) => {
        const pokemonFrom = await Pokemon.findByPk(req.body.from_id)
        const pokemonTo = await Pokemon.findByPk(req.body.to_id)
        if (!pokemonFrom) {
            return res.status(400).json({ message: `No pokemon record for id ${req.body.from_id}`})
        } 
        if (!pokemonTo) {
            return res.status(400).json({ message: `No pokemon record for id ${req.body.to_id}`})
        } 
        Evolution.create(req.body)
            .then(evolution => {
                const message = `Evolution from ${`${pokemonFrom.form} ${pokemonFrom.pokemon_name}`} to ${`${pokemonTo.form} ${pokemonTo.pokemon_name}`} has been set.`
                res.json({ message, data: evolution })
            })
            .catch(error => {
                if (error instanceof UniqueConstraintError) {
                    const message = `An evolution already exists from ${`${pokemonFrom.form} ${pokemonFrom.pokemon_name}`} to ${`${pokemonTo.form} ${pokemonTo.pokemon_name}`}.`;
                    return res.status(400).json({ message, data: error });
                }
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                const message = `Evolution from ${`${pokemonFrom.form} ${pokemonFrom.pokemon_name}`} to ${`${pokemonTo.form} ${pokemonTo.pokemon_name}`} couldn't be added, please try again in a few minutes.`
                res.status(500).json({ message, data: error })
            })
    }) 
}