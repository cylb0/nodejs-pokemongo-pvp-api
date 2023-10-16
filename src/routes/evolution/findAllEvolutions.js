const { Evolution } = require("../../db/sequelize")
const auth = require('./../../auth/auth')

module.exports = (app) => {
    app.get('/api/evolution', auth, (req, res) => {
        Evolution.findAndCountAll()
            .then(({count, rows}) => {
                const message = `${count} evolutions found.`
                return res.json({ message, data: rows })
            })
            .catch(error => {
                const message = `An error occured while retrieving evolutions.`
                res.status(500).json({ message, data: error })
            })
    })
}