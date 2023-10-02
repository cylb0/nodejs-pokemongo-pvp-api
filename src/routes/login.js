const { User } = require('./../db/sequelize')
const bcrypt = require('bcrypt')

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        User.findOne({ where: { username: req.body.username } }).then(user => {
            bcrypt.compare(req.body.password, user.password).then(isValid => {
                if(isValid) {
                    const message = 'User has been logged in successfully.'
                    return res.json({ message, data: user })
                }
            })
        })
    })
}