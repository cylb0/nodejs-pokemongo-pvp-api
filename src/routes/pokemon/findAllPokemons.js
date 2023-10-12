const { Pokemon } = require('../../db/sequelize')
const { Op } = require('sequelize')

module.exports = (app) => {
    app.get('/api/pokemon', (req, res) => {
        
        let whereClause = {}

        if (req.query.id && req.query.name) {
            return res.status(400).json({ message: 'Please provide either an "id" or a "name," but not both.' });
        }

        if (req.query.id) {
            const id = req.query.id
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ message: 'Invalid pokemon id, please provide a positive integer as a pokemon id.' })
            }
            whereClause.id = id
        }

        if (req.query.name) {
            const name = req.query.name
            whereClause.pokemon_name = { [Op.like]: `%${name}%` }
        }

        Pokemon.findAndCountAll({
            where: whereClause,
            limit: 3,
            order: [['id', 'asc']]
        })  
            .then(({ count, rows }) => {
                const message = `${count} pokemons found.`;
                res.json({ message, data: rows })
            })
            .catch(error => {
                const message = `An error occured while retrieving pokemons.`
                res.status(500).json({ message, data: error })
            })
    })
}