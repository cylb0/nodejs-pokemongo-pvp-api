const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Pokemon } = require('./../db/sequelize')

module.exports = (app) => {
    app.post('/api/pokemon', (req, res) => {
        Pokemon.create(req.body)
            .then(pokemon => {
                const message = `Pokemon ${req.body.name} has been created.`
                res.json({ message, data: pokemon })
            })
            .catch(error => {
                if (error instanceof UniqueConstraintError) {
                    const message = `A Pokémon already exists for this id and form.`;
                    return res.status(400).json({ message, data: error });
                }
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                const message = `The pokemon couldn't be added, please try again in a few minutes.`
                res.status(500).json({ message, data: error })
            })
    }) 
}