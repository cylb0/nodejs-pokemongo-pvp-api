const jwt = require('jsonwebtoken')
const secretKey = require('./../auth/secret_key')

module.exports = (req, res, next) => {
    const authorization = req.headers.authorization

    if(!authorization) {
        const message = `You didn't provide an authentication token. Please include an authentication token in the headers of your request.`
        res.status(401).json({ message })
    }

    // authorization: Bearer <JWT>
    const token = authorization.split(' ')[1]

    const decodedToken = jwt.verify(token, secretKey, (error, decodedToken) => {
        if(error) {
            if(error.name === 'TokenExpiredError') {
                const message = 'Authentication token has expired.'
                return res.status(401).json({ message })
            } else {
                const message = `Invalid authentication token. You are not allowed to access this ressource.`
                return res.status(401).json({ message })
            }
        }

        const userId = decodedToken.userId
        if(req.body.userId && req.body.userId !== userId) {
            const message = 'The id of the user is invalid.'
            res.status(401).json({ message })
        } else {
            next()
        }
    })    
}