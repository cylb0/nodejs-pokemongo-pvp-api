const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Pokemon } = require('../../../db/sequelize')
const auth = require('../../../auth/auth')
const { capitalizeFirstLetter } = require('./../../../middlewares/capitalizeFirstLetter')


module.exports = (app) => {
    app.put('/api/pokemon/:id', auth, capitalizeFirstLetter, (req, res) => {
        const id = req.params.id
        Pokemon.findByPk(id)
            .then(pokemon => {
                if(pokemon === null) {
                    const message = `This pokemon doesn't exist. Please try again with another id.`
                    return res.status(404).json({message})
                }

                pokemon.update(req.body)
                    .then(updatedPokemon => {
                        const message = `#${updatedPokemon.pokemon_id} ${updatedPokemon.pokemon_name} has been successfully modified.`
                        res.json({ message, data: pokemon })
                    })
                    .catch(error => {
                        if (error instanceof UniqueConstraintError) {
                            if (error.fields['PRIMARY']) {
                                const message = `There is already a pokemon with this pokemon_id`
                                return res.status(400).json({ message, data: error });
                            } if (error.fields['pokemon_name']) {
                                const message = `There is already a pokemon with this pokemon_name`
                                return res.status(400).json({ message, data: error });
                            }
                        }
                        if (error instanceof ValidationError) {
                            return res.status(400).json({ message: error.message, data: error })
                        }
                        const message = `The pokemon couldn't be updated, please try again in a few minutes.`
                        res.status(500).json({ message, data: error })
                    })
            })
    })
}












//         Pokemon.update(req.body, {
//             where: { id: id }
//         })
//         .then(_ => {
//             return Pokemon.findByPk(id)
//                 .then(pokemon => {
//                     if(pokemon === null) {
//                         const message = `This pokemon doesn't exist. Please try again with another id.`
//                         return res.status(404).json({message})
//                     }
//                     const message = `#${pokemon.pokemon_id} ${pokemon.name} has been successfully modified.`
//                     res.json({ message, data: pokemon })
//                 })
//         })
//         .catch(error => {
//             if (error instanceof UniqueConstraintError) {
//                 const message = `A Pokémon already exists for this id and form.`;
//                 return res.status(400).json({ message, data: error });
//             }
//             if (error instanceof ValidationError) {
//                 return res.status(400).json({ message: error.message, data: error })
//             }
//             const message = `The pokemon couldn't be updated, please try again in a few minutes.`
//             res.status(500).json({ message, data: error })
//         })
//     })
// }