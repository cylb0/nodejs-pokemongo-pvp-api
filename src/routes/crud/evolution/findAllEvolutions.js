const { Evolution } = require("../../../db/sequelize")
const auth = require('./../../../auth/auth')

module.exports = (app) => {
    app.get('/api/evolution', auth, (req, res) => {

        let whereClause = {}

        if (req.query.id) {
            const id = req.query.id
            if (isNaN(id) || id < 1) {
                return res.status(400).json({ message: `Invalid id, id should be an integer superior to one.` })
            }
            whereClause.fromId = id
        }

        Evolution.findAndCountAll({
            where: whereClause
        })
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