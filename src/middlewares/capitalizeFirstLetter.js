function capitalizeFirstLetter(req, res, next) {
    if (req.body.pokemon_name) {
        req.body.pokemon_name = req.body.pokemon_name.charAt(0).toUpperCase() + req.body.pokemon_name.slice(1)
    }
    if (req.body.form) {
        req.body.form = req.body.form.charAt(0).toUpperCase() + req.body.form.slice(1)
    }
    next()
}

module.exports = { capitalizeFirstLetter }