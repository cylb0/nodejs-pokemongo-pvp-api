const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT ||3000

const marked = require('marked')
const fs = require('fs')
const readmePath = __dirname + '/README.md'
const readmeContent = fs.readFileSync(readmePath, 'utf-8')
const readmeHTML = marked.parse(readmeContent)

app
    .use(favicon(__dirname + '/src/img/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

app.get('/', (req, res) => {
    res.send(readmeHTML)
})

require('./src/routes/getAllPokemons')(app)

app.use(({res}) => {
    const message = `This ressource doesn't exist. Try another URL.`
    res.status(404).json({message})
})

app.use((err, req, res, next) => {
    const message = `Internal server error.`
    res.status(500).json({message})
})

app.listen(port, () => console.log(`L'application est démarrée sur http://localhost:${port}`))