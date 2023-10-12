const { Form } = require('./../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('./../../auth/auth')

module.exports = (app) => {
    app.put('/api/form/:id', auth, (req, res) => {
        const id = req.params.id
        Form.findByPk(id)
            .then(form => {
                if (form === null) {
                    return res.status(404).json({ message: `This pokemon form record doesnt exist, please try again with another id.`})
                }
                form.update(req.body)
                    .then(updatedForm => {
                        const message = `Record ${updatedForm.id} for ${updatedForm.form} form of pokemon #${updatedForm.pokemonId} has been successfuly updated.`
                        res.json({ message, data: updatedForm })
                    })
                    .catch(error => {
                        if (error instanceof UniqueConstraintError) {
                            const message = `A record already exist for this Pokemon and form.`
                            return res.status(400).json({ message, data: error });
                        }
                        if (error instanceof ValidationError) {
                            return res.status(400).json({ message: error.message, data: error })
                        }
                        const message = `The pokemon form record couldn't be updated, please try again in a few minutes.`
                        res.status(500).json({ message, data: error })
                    })

            })
    })
}