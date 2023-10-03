require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const marked = require('marked')
const fs = require('fs')
const sequelize = require('./src/db/sequelize')
const cors = require('cors')

const app = express()
const port = process.env.PORT ||3000

const readmePath = __dirname + '/README.md'
const readmeContent = fs.readFileSync(readmePath, 'utf-8')
const readmeHTML = marked.parse(readmeContent)

app
    .use(favicon(__dirname + '/src/img/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())
    .use(cors())

sequelize.initDB()

app.get('/', (req, res) => {
    res.send(readmeHTML)
})

require('./src/routes/findAllPokemons')(app)
require('./src/routes/findAllReleasedPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

app.use(({res}) => {
    const message = `Resource does not exist ! Please try another URL.`
    res.status(404).json({ message })
})

app.listen(port, () => console.log(`L'application est démarrée sur le port ${port}`))