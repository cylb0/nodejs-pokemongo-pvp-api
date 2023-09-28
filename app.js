const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/src/img/favicon.ico'))
    .use(morgan('dev')) 

app.get('/', (req, res) => {
    res.send('API Pokemon GO')
})

app.listen(port, () => console.log(`L'application est démarrée sur http://localhost:${port}`))