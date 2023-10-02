const { User } = require('./../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = require('./../auth/private_key')

module.exports = (app) => {
    app.post('/api/login', (req, res) => {

        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({ message: 'username and password are required.' })
        }

        User.findOne({ where: { username: username } }).then(user => {

            if (!user) {
                const message = `This user doesn't exist.`
                return res.status(404).json({ message  })
            }

            bcrypt.compare(password, user.password).then(isValid => {
                if(!isValid) {
                    const message = 'The password is incorrect, please try again.'
                    return res.json({ message, data: user })
                }

                const token = jwt.sign(
                    { 
                        userId: user.id,
                        username: user.username 
                    },
                    secretKey,
                    { expiresIn: '1h' }
                )

                const message = 'User has been logged in successfully.'
                return res.json({ message, data: user, token })
            })
        })
        .catch(error => {
            const message = `User couldn't be authenticated. Please try again in a few minutes.`
            return res.status(500).json({ message, data: error })
        })
    })
}