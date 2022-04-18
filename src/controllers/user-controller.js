const uuid = require('uuid')
const bcrypt = require('bcrypt')
const database = require('../config').promise()
const http_status = require('../helpers/http-status-code')
const createError = require('../helpers/create-error')
const createRespond = require('../helpers/create-respond')
const { registerSchema } = require('../helpers/validation-schema')

// REGISTER HANLDER
module.exports.register = async (req, res) => {
    const { username, email, password, repassword } = req.body
    try {
        // 1. verify password & repassword
        if (password !== repassword) {
            throw new createError(http_status.BAD_REQUEST, `password and re-password doesn't match.`)
        }

        // 2. verify req.body by our schema
        const { error } = registerSchema.validate(req.body)
        if (error) {
            throw new createError(http_status.BAD_REQUEST, error.details[0].message)
        }

        // 3. verify if username and email is unique
        const CHECK_USER = `SELECT id FROM users WHERE username = ? AND email = ?;`
        const [ USER ] = await database.execute(CHECK_USER, [username, email])
        if (USER.length) {
            throw new createError(http_status.BAD_REQUEST, 'username and email must be unique.')
        }

        // 4. generate uid
        const uid = uuid.v4()

        // 5. encypt-ing or hash-ing password
        const salt = await bcrypt.genSalt(10)
        console.log('salt : ', salt)

        const hashpassword = await bcrypt.hash(password, salt)
        console.log('plain : ', password)
        console.log('hash: ', hashpassword)

        // 6. do query INSERT
        const INSERT_USER = `
            INSERT INTO users(uid, username, email, password)
            VALUES(${database.escape(uid)}, ${database.escape(username)}, ${database.escape(email)}, ${database.escape(hashpassword)});
        `
        const [ INFO ] = await database.execute(INSERT_USER)

        // create respond
        const respond = new createRespond(
            http_status.CREATED, 
            'add new user', true, 1, 1, 
            { id : INFO.insertId, uid : uid, username : username, email: email }
        )
        res.status(respond.status).send(respond)
    } catch (error) {
        console.log('error : ', error)
        const isTrusted = error instanceof createError
        if (!isTrusted) {
            error = new createError(http_status.INTERNAL_SERVICE_ERROR, error.sqlMessage)
            console.log(error)
        }
        res.status(error.status).send(error)
    }
}