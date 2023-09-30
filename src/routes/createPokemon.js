const { Pokemon } = require('./../db/sequelize')

module.exports = (app) => {
    app.post('/api/pokemon', (req, res) => {
        Pokemon.create(req.body)
            .then(pokemon => {
                const message = `Pokemon ${req.body.en_name} has been created.`
                res.json({ message, data: pokemon })
            })
            .catch(error => {
                const message = `The pokemon couldn't be added, please try again in a few minutes.`
                res.status(500).json({ message, data: error })
            })
    }) 
}