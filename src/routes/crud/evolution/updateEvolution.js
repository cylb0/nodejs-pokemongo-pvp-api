const { Evolution } = require('./../../../db/sequelize')
const auth = require('./../../../auth/auth')

module.exports = (app) => {
    app.put('/api/evolution/:id', auth, (req, res) => {
        const id = req.params.id
        Evolution.findByPk(id)
            .then(evolution => {
                if (evolution === null) {
                    return res.status(404).json({ message: `This evolution record doesn't exist. Please try again with another id.` })
                }
                evolution.update(req.body)
                    .then(updatedEvolution => {
                        const message = `Evolution has been successfuly updated.`
                        return res.json({ message, data: updatedEvolution })
                    })
                    .catch(error => {
                        if (error instanceof UniqueConstraintError) {
                            const message = `An evolution already exists between those pokemons.`
                            return res.status(400).json({ message, data: error });
                        }
                        if (error instanceof ForeignKeyConstraintError) {
                            const message = `Foreign key violation, cannot find a record for this evolution.`
                            return res.status(400).json({ message, data: error });
                        }
                        if (error instanceof ValidationError) {
                            return res.status(400).json({ message: error.message, data: error })
                        }
                        const message = `The evolution form record couldn't be updated, please try again in a few minutes.`
                        res.status(500).json({ message, data: error })
                    })
            })
    })
}