const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const marked = require('marked')
const fs = require('fs')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = process.env.PORT ||3000

const readmePath = __dirname + '/README.md'
const readmeContent = fs.readFileSync(readmePath, 'utf-8')
const readmeHTML = marked.parse(readmeContent)

app
    .use(favicon(__dirname + '/src/img/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDB()

app.get('/', (req, res) => {
    res.send(readmeHTML)
})

require('./src/routes/getAllPokemons')(app)

app.listen(port, () => console.log(`L'application est démarrée sur le port ${port}`))