const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
let pokemons = require('./src/data/released_pokemon.json')
const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/src/img/favicon.ico'))
    .use(morgan('dev')) 

app.get('/', (req, res) => {
    const message = "API Pokemon GO"
    res.json({ message })
})

require('./src/routes/getAllPokemons')(app)

app.listen(port, () => console.log(`L'application est démarrée sur http://localhost:${port}`))