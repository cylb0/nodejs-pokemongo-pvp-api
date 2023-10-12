const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Pokemon } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/api/pokemon', auth, (req, res) => {
        Pokemon.create(req.body)
            .then(pokemon => {
                const message = `Pokemon #${req.body.id} ${req.body.pokemon_name} has been created.`
                res.json({ message, data: pokemon })
            })
            .catch(error => {
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                const message = `The pokemon couldn't be added, please try again in a few minutes.`
                res.status(500).json({ message, data: error })
            })
    }) 
}