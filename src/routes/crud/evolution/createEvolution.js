const { ValidationError, UniqueConstraintError, Op, ForeignKeyConstraintError } = require('sequelize')
const { Evolution, Form, Pokemon } = require('../../../db/sequelize')
const auth = require('../../../auth/auth')

module.exports = (app) => {
    app.post('/api/evolution', auth, async(req, res) => {
        const fromId = req.body.fromId
        const toId = req.body.toId

        // Check if both pokemons are the same
        if (fromId === toId) {
            const message = `A pokemon can't be evolved from itself.`
            return res.status(400).json({ message })
        }

        // Check if there's already an evolution between those two pokemons
        const existingEvolution = await Evolution.findOne({
            where: {
                [Op.or]: [
                    {
                        fromId: toId,
                        toId: fromId
                    },
                    {
                        fromId: fromId,
                        toId: toId
                    }
                ]

            }
        })
        if (existingEvolution !== null) {
            const message = `An evolution relation already exists between those two pokemons.`
            return res.status(400).json({ message })
        }

        // Prevent evolution from a form to another form of the same pokemon
        const formFrom = await Form.findByPk(fromId)
        const formTo = await Form.findByPk(toId)
        if (formFrom === null) {
            return res.status(404).json({ message: `Pokemon form with id ${fromId} doesn't exist.` })
        }
        if (formTo === null) {
            return res.status(404).json({ message: `Pokemon form with id ${toId} doesn't exist.` })
        }
        if (formFrom.pokemonId === formTo.pokemonId) {
            const message = `A pokemon form cannot evolve into another form of the same pokemon`
            return res.status(400).json({ message })
        }

        Evolution.create(req.body)
            .then((evolution) => {
                const message = `Evolution has been set.`
                res.json({ message, data: evolution })
            })
            .catch(error => {
                if (error instanceof UniqueConstraintError) {
                    const message = `This evolution already exists. `
                    return res.status(400).json({ message, data: error })
                }
                if (error instanceof ForeignKeyConstraintError) {
                    return res.status(400).json({ message: `${error.fields} doesn't match any record.` })
                }
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                const message = `Evolution couldn't be added, please try again in a few minutes.`
                res.status(500).json({ message, data: error })
            })
    }) 
}