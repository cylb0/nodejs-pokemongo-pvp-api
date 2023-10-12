const { Form, Pokemon } = require('./../../db/sequelize')
const { Op } = require('sequelize')
const allowedForms = ['normal', 'alolan', 'galarian', 'hisuian', 'paldean']

module.exports = (app) => {
    app.get('/api/form', (req, res) => {

        let whereClause = {}

        if (req.query.id && req.query.name) {
            return res.status(400).json({ message: `Please provide either an id or a name for the pokemon but not both.` })
        }

        if (req.query.form) {
            const form = req.query.form
            if (!allowedForms.includes(form.toLowerCase())) {
                return res.status(400).json({ message: `Invalid form, valid forms are ${allowedForms.join(', ')}` })
            }
            whereClause.form = form
        }

        if (req.query.id) {
            const id = req.query.id
            if (isNaN(id) || id < 1) {
                return res.status(400).json({ message: 'Invalid pokemon_id, ' })
            }
            whereClause.pokemonId = id
        }
        
        const promises = [];
        if (req.query.name) {
            const name = req.query.name
            const namePromise = Pokemon.findOne({ where: { pokemon_name: { [Op.like]: `%${name}%` } }})
            .then(pokemon => {
                if (pokemon === null) {
                    return res.status(404).json({ message: `No pokemon record for that name. Please try again with another name.` })
                }
                whereClause.pokemonId = pokemon.id
            })
            .catch(error => {
                return res.status(500).json({ message: `An error occured while retrieving the pokemon.`, data: error })
            })
            promises.push(namePromise)
        }

        Promise.all(promises)
            .then(() => {
                return  Form.findAndCountAll({
                    attributes: [['pokemonId', 'pokemon_id'], 'Pokemon.pokemon_name', 'form', 'base_attack', 'base_defense', 'base_stamina'],
                    include: {
                        model: Pokemon,
                        attributes: [],
                        required: true
                    },
                    where: whereClause,
                    order: [['pokemon_id', 'asc']],
                    raw: true
                })
            })       
            .then(({ count, rows }) => {
                const message = `${count} pokemons found.`
                return res.json({ message, data: rows })
            })
            .catch(error => {
                const message = `An error occured while retrieving pokemons.`
                return res.status(500).json({ message, data: error })
            })
    })
}