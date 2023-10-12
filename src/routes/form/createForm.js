const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Form } = require('./../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/api/form', auth, (req, res) => {
        Form.create(req.body)
            .then(form => {
                const message = `A new ${form.form} form for Pokemon #${form.pokemonId} has been added.`
                res.json({ message, data: form })    
            })
            .catch(error => {
                if (error instanceof UniqueConstraintError) {
                    const message = `A record already exist for ${req.body.form} form of Pokemon #${req.body.pokemonId}.`
                    return res.status(400).json({ message, data: error });
                }
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                const message = `The new form couldn't be added, please try again in a few minutes.`
                res.status(500).json({ message, data: error })
            })
    })
}