const uuid = require('uuid')
const bcrypt = require('bcrypt')
const otp_generator = require('otp-generator')
const nodemailer = require('nodemailer')
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
        console.log('uid : ', uid)

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
        await database.execute(INSERT_USER)

        // 7. generate OTP
        const otp = otp_generator.generate(6, { upperCaseAlphabets: false, specialChars: false })
        console.log('otp : ', otp)

        // 8. store OTP into our database
        const INSERT_TOKEN = `INSERT INTO tokens(uid, otp) VALUES(${database.escape(uid)}, ${database.escape(otp)});`
        await database.execute(INSERT_TOKEN)

        // 9. send otp token to our client
        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : 'ali.muksin0510@gmail.com',
                pass : process.env.MAIL_PASS
            },
            tls : { rejectUnauthorized : false }
        })

        await transporter.sendMail({
            from : '<admin/> ali.muksin0510@gmail.com',
            to : 'fullstack.manager.pwdk@gmail.com',
            subject : 'OTP verification',
            html : `
                <p>please verify your account using this code.</p>
                <p>code : <b>${otp}</b></p>

                <p>NOTE : do not share this code.</p>
            `
        })

        // create respond
        const respond = new createRespond(
            http_status.CREATED, 
            'add new user', true, 1, 1, 'user has been added and please verify your account.'
            // { id : INFO.insertId, uid : uid, username : username, email: email }
        )
        res.header('UID', uid).status(respond.status).send(respond)
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

// GET USERS
module.exports.getUsers = async (req, res) => {
    try {
        // define query
        const GET_USERS = `SELECT * FROM users LIMIT 5;`
        const [ USERS ] = await database.execute(GET_USERS)

        // delete password parameter
        for (let i = 0; i < USERS.length; i++) {
            delete USERS[i].password
        }

        // create respond
        const respond = new createRespond(http_status.OK, 'get', true, 1, 1, USERS)
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

// GET USERS BY UID
module.exports.getUsersByUid = async (req, res) => {
    const UID = req.params.uid
    try {
        // define query
        const GET_USER = `SELECT * FROM users WHERE uid = ?;`
        const [ USER ] = await database.execute(GET_USER, [UID])

        // delete password parameter
        delete USER[0].password

        // create respond
        const respond = new createRespond(http_status.OK, 'get', true, 1, 1, USER[0])
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

// VERIFIED USER
module.exports.verifyUser = async (req, res) => {
    const token = req.body.token
    const UID = req.header('UID')
    try {
        // check token
        const CHECK_TOKEN = `SELECT createdAt FROM tokens WHERE uid = ? AND otp = ?;`
        const [ TOKEN ] = await database.execute(CHECK_TOKEN, [UID, token])
        if (!TOKEN.length) {
            throw new createError(http_status.BAD_REQUEST, 'token invalid.')
        }

        // if token exist -> valid? expired?
        const now = new Date().getTime() // miliseconds
        const created = new Date(TOKEN[0].createdAt).getTime()
        const step = now - created
        if (step >= 60000) {
            throw new createError(http_status.BAD_REQUEST, 'token expired.')
        }

        // change user status
        const UPDATE_USER = `UPDATE users SET status = 1 WHERE uid = ?;`
        const [ INFO ] = await database.execute(UPDATE_USER, [UID])

        // delete token
        const DELETE_TOKEN = `DELETE FROM tokens WHERE uid = ? AND otp = ?;`
        await database.execute(DELETE_TOKEN, [UID, token])

        // create respond
        const respond = new createRespond(http_status.OK, 'verified user', true, 1, 1, INFO.info)
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

// REFRESH TOKEN
module.exports.refreshToken = async (req, res) => {

}