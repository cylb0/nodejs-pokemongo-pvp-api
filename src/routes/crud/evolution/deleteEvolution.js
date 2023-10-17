const { Evolution } = require('./../../../db/sequelize')
const auth = require('./../../../auth/auth')

module.exports = (app) => {
    app.delete('/api/evolution/:id', auth, (req, res) => {
        const id = req.params.id
        Evolution.findByPk(id)
            .then(evolution => {
                if (evolution === null) {
                    return res.status(404).json({ message: `This evolution doesn't exist, please try again with another id.` })
                }
                const deletedEvolution = evolution
                Evolution.destroy({
                    where: { id: evolution.id}
                })
                    .then(_ => {
                        const message = `Record with id ${deletedEvolution.id} has been successfully deleted.`
                        res.json({ message, data: deletedEvolution })
                    })
                    .catch(error => {
                        res.status(500).json({ message: `Record couldn't be deleted, please try again in a few minutes.` })
                    })
            })
    })
}