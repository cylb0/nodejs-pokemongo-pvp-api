const { Form } = require('./../../db/sequelize')
const auth = require('./../../auth/auth')

module.exports = (app) => {
    app.get('/api/form/:id', auth, (req, res) => {
        Form.findByPk(req.params.id)
            .then(form => {
                if (form === null) {
                    const message = `No pokemon form found for this id.`
                    return res.status(404).json({ message })
                }
                const message = `The record with id ${form.id} has been successfully retrieved.`
                return res.json({ message, data: form })
            })
            .catch(error => {
                const message = `The pokemon couldn't be retrieved, please try again in a few minutes.`
                res.status(500).json({ message, data: error })
            })
    })
}