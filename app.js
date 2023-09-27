const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('API Pokemon GO')
})

app.listen(port, () => console.log(`L'application est démarrée sur http://localhost:${port}`))