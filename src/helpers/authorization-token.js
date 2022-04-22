const JWT = require('jsonwebtoken')
const http_status = require('./http-status-code')
const createError = require('./create-error')

module.exports = (req, res, next) => {
    const token = req.header('Auth-Token')
    try {
        // check token
        if (!token) {
            throw new createError(http_status.UNAUTHORIZHED, 'un-authorized.')
        }

        // verify token
        const { uid } = JWT.verify(token, process.env.SECRET_KEY)

        // modifed object req
        req.uid = uid
        next()
    } catch (error) {
        const isTrusted = error instanceof createError
        if (!isTrusted) {
            error = new createError(http_status.INTERNAL_SERVICE_ERROR, error.message)
            console.log(error)
        }
        res.status(error.status).send(error)
    }
}