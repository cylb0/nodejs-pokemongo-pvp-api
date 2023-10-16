const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Pokemon } = require('../../db/sequelize')
const auth = require('../../auth/auth')
const { capitalizeFirstLetter } = require('./../../middlewares/capitalizeFirstLetter')

module.exports = (app) => {
    app.post('/api/pokemon', auth, capitalizeFirstLetter, (req, res) => {
        Pokemon.create(req.body)
            .then(pokemon => {
                const message = `Pokemon #${req.body.pokemon_id} ${req.body.pokemon_name} has been created.`
                res.json({ message, data: pokemon })
            })
            .catch(error => {
                if (error instanceof UniqueConstraintError) {
                    if (error.fields['PRIMARY']) {
                        const message = `There is already a pokemon with this pokemon_id`
                        return res.status(400).json({ message, data: error });
                    } if (error.fields['pokemon_name']) {
                        const message = `There is already a pokemon with this pokemon_name`
                        return res.status(400).json({ message, data: error });
                    }
                }
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                const message = `The pokemon couldn't be added, please try again in a few minutes.`
                res.status(500).json({ message, data: error })
            })
    }) 
}