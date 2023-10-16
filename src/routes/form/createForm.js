const { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } = require('sequelize')
const { Form } = require('./../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/api/form', auth, (req, res) => {
        Form.create(req.body)
            .then(form => {
                const message = `A new ${form.form} form has been successfully added for pokemon ${form.pokemonId}.`
                res.json({ message, data: form })    
            })
            .catch(error => {
                if (error instanceof UniqueConstraintError) {
                    const message = `A record already exist for this pokemon and form.`
                    return res.status(400).json({ message, data: error });
                }
                if (error instanceof ForeignKeyConstraintError) {
                    const message = `Foreign key violation, cannot find a pokemon for this pokemonId.`
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