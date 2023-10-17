const { Evolution } = require('./../../../db/sequelize')
const auth = require('./../../../auth/auth')

module.exports = (app) => {
    app.get('/api/evolution/:id', auth, (req, res) => {
        const id = req.params.id
        Evolution.findByPk(id)
            .then(evolution => {
                if (evolution === null) {
                    const message = `No evolution for this id.`
                    return res.status(404).json({ message })
                }
                const message = `The record with id ${evolution.id} has been successfully retrieved.`
                return res.json({ message, data: evolution })
            })
            .catch(error => {
                const message = `The evolution couldn't be retrieved, please try again in a few minutes.`
                res.status(500).json({ message, data: error })
            })
    })
}