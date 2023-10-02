const { User } = require('./../db/sequelize')
const bcrypt = require('bcrypt')

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        User.findOne({ where: { username: req.body.username } }).then(user => {

            if (!user) {
                const message = `This user doesn't exist.`
                return res.status(404).json({ message  })
            }

            bcrypt.compare(req.body.password, user.password).then(isValid => {
                if(!isValid) {
                    const message = 'The password is incorrect, please try again.'
                    return res.json({ message, data: user })
                }
                const message = 'User has been logged in successfully.'
                return res.json({ message, data: user })
            })
        })
        .catch(error => {
            const message = `User couldn't be authenticated. Please try again in a few minutes.`
            return res.status(500).json({ message })
        })
    })
}