const { Pokemon, Form } = require('./../../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemon_stats.json', (req, res) => {
        Form.findAll({
            attributes: ['form', 'base_attack', 'base_defense', 'base_stamina'],
            include: [
                {
                    model: Pokemon,
                    attributes: ['pokemon_id', 'pokemon_name', 'pokemon_name_fr']
                }
            ]
        })
            .then(forms => {
                const results = forms.map((form) => {
                    return {
                        pokemon_id: form.Pokemon.pokemon_id,
                        pokemon_name: form.Pokemon.pokemon_name,
                        pokemon_name_fr: form.Pokemon.pokemon_name_fr,
                        from: form.form,
                        base_attack: form.base_attack,
                        base_defense: form.base_defense,
                        base_stamina: form.base_stamina
                    }
                })
                return res.json(results)
            })
            .catch((error) => {
                const message = `Couldn't retrieve data, please try again in a few minutes.`
                res.status(500).json({ message, data: error })
            })
    })
}