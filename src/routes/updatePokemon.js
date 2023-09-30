const { Pokemon } = require('./../db/sequelize')

module.exports = (app) => {
    app.put('/api/pokemon/:id', (req, res) => {
        const id = req.params.id
        Pokemon.update(req.body, {
            where: { id: id }
        })
        .then(_ => {
            return Pokemon.findByPk(id)
                .then(pokemon => {
                    if(pokemon === null) {
                        const message = `This pokemon doesn't exist. Please try again with another id.`
                        return res.status(404).json({message})
                    }
                    const message = `#${pokemon.pokemon_id} ${pokemon.en_name} has been successfully modified.`
                    res.json({ message, data: pokemon })
                })
        })
        .catch(error => {
            const message = `The pokemon couldn't be updated, please try again in a few minutes.`
            res.status(500).json({ message, data: error })
        })
    })
}