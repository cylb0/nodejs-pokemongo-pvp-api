const { Form } = require('./../../db/sequelize')
const auth = require('./../../auth/auth')

module.exports = (app) => {
    app.delete('/api/form/:id', auth, (req, res) => {
        Form.findByPk(req.params.id)
            .then(form => {
                if (form === null) {
                    const message = `Record with id ${req.params.id} doesn't exist, please try with another id.`
                    return res.status(404).json({ message })
                }
                const deletedForm = form
                Form.destroy({
                    where: { id: form.id }
                })
                    .then(_ => {
                        const message = `Record ${deletedForm.id} for ${deletedForm.form} form of Pokemon #${deletedForm.pokemonId} has been successfully deleted.`
                        res.json({ message, data: deletedForm })
                    })
                    .catch(error => {
                        res.json({ message: `Record couldn't be deleted, please try again in a few minutes.` })
                    })
            })
    })
}