const { Sequelize } = require('sequelize')
const { Pokemon, Form, Evolution } = require('./../../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemon_evolutions.json', (req, res) => {
        Form.findAll({
            attributes: ['id', 'form'],
            include: [
                {
                    model: Pokemon,
                    attributes: ['pokemon_id', 'pokemon_name', 'pokemon_name_fr']
                }
                ,
                {
                    model: Evolution,
                    attributes: [],
                    where: {
                        fromId: Sequelize.col('Form.id')
                    },
                    required: false
                }
            ]
        })
            .then(forms => {
                const promiseArray = forms.map((form) => {
                    return Evolution.findAll({
                        where: {
                            fromId: form.id
                        }
                        ,
                        include: [
                            {
                                model: Form,
                                attributes: ['form'],
                                include: {
                                    model: Pokemon,
                                    attributes: ['pokemon_id', 'pokemon_name', 'pokemon_name_fr']
                                }
                            }
                        ]
                    })
                })

                return Promise.all(promiseArray)
                    .then((evolutionArray) => {
                        const results = forms.map((form, index) => {
                            const evolutionsData = evolutionArray[index].map((evolution) => ({
                                pokemon_id: evolution.Form.Pokemon.pokemon_id,
                                pokemon_name: evolution.Form.Pokemon.pokemon_name,
                                pokemon_name_fr: evolution.Form.Pokemon.pokemon_name_fr,
                                form: evolution.Form.form
                            }))

                            return {
                                pokemon_id: form.Pokemon.pokemon_id,
                                pokemon_name: form.Pokemon.pokemon_name,
                                pokemon_name_fr: form.Pokemon.pokemon_name_fr,
                                form: form.form,
                                evolutions: evolutionsData
                            }
                        })
                        return res.json(results)
                    })
            })
            .catch(error => {
                console.error('unhandled error: ', error.message, error.stack)
            })
    })
}