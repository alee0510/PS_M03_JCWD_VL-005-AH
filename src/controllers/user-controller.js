const uuid = require('uuid')
const bcrypt = require('bcrypt')
const otp_generator = require('otp-generator')
const JWT = require('jsonwebtoken')
const database = require('../config').promise()
const http_status = require('../helpers/http-status-code')
const createError = require('../helpers/create-error')
const createRespond = require('../helpers/create-respond')
const transporter = require('../helpers/transporter')
const { registerSchema, loginSchema } = require('../helpers/validation-schema')

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
        await transporter.sendMail({
            from : '"admin" <ali.muksin0510@gmail.com>',
            to : `${email}`,
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
    const token = req.body.token
    const UID = req.header('UID')
    try {
        // check token
        const CHECK_TOKEN = `SELECT createdAt FROM tokens WHERE otp = ? AND uid = ?;`
        const [ TOKEN ] = await database.execute(CHECK_TOKEN, [token, UID])
        if (!TOKEN.length) {
            throw new createError(http_status.BAD_REQUEST, 'invalid token.')
        }

        // if token exist -> check expired or not?
        const now = new Date()
        const current = now.getTime()
        const created = new Date(TOKEN[0].createdAt).getTime()
        const step = current - created
        const remaining = Math.floor((30000 - step) / 1000) // milisecons
        if (step <= 30000) {
            throw new createError(http_status.BAD_REQUEST, `please wait for ${remaining}s to refresh the token.`)
        }

        // if token exists -> refresh token
        const new_token = otp_generator.generate(6, { upperCaseAlphabets: false, specialChars: false })
        console.log('new token : ', new_token)
        console.log('created at : ', now)

        // define query update
        const UPDATE_TOKEN = `UPDATE tokens SET otp = ?, createdAt = ? WHERE uid = ?;`
        const [ INFO ] = await database.execute(UPDATE_TOKEN, [new_token, now, UID])
        console.log(INFO.info)

        // get email client
        const GET_EMAIL = `SELECT email FROM users WHERE uid = ?;`
        const [ EMAIL ] = await database.execute(GET_EMAIL, [UID])

        // send token to client
        await transporter.sendMail({
            from : '"admin" <ali.muksin0510@gmail.com>',
            to : `${EMAIL[0].email}`,
            subject : 'OTP verification',
            html : `
                <p>please verify your account using this code.</p>
                <p>code : <b>${new_token}</b></p>

                <p>NOTE : do not share this code.</p>
            `
        })

        // create respond
        const respond = new createRespond(http_status.OK, 'update token', true, 1, 1, INFO.info)
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


// LOGIN
module.exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        // 1. validation req.body format -> according to our schema
        const { error } = loginSchema.validate(req.body)
        if (error) {
            throw new createError(http_status.BAD_REQUEST, error.details[0].message)
        }

        // 2. data validation -> if user exist or not?
        const CHECK_USER = `SELECT * FROM users WHERE username = ?;`
        const [ USER ] = await database.execute(CHECK_USER, [username])
        if (!USER.length) {
            throw new createError(http_status.BAD_REQUEST, 'user is not registered.')
        }

        // 3. if user exist in our database -> validate password ->  do authentication
        // -> check password -> req.body.password vs password from our database
        const valid = await bcrypt.compare(password, USER[0].password)
        console.log('is valid : ', valid)
        if(!valid) {
            throw new createError(http_status.BAD_REQUEST, 'invalid password.')
        }

        // 4. create JWT Token
        const token = JWT.sign({ uid : USER[0].uid }, process.env.SECRET_KEY)

        // create respond
        delete USER[0].password
        const respond = new createRespond(http_status.OK, 'login', true, 1, 1, USER[0])
        res.header('Auth-Token', `Bearer ${token}`).send(respond)
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

// KEEPLOGIN
module.exports.keeplogin = async (req, res) => {
    // const token = req.header('Auth-Token')
    const uid = req.uid
    try {
        // // 1. check token
        // if (!token) {
        //     throw new createError(http_status.UNAUTHORIZHED, 'un-authorized.')
        // }

        // // 2. if token exist -> validate token
        // const { uid } = JWT.verify(token, process.env.SECRET_KEY)
        // if (!uid) {
        //     throw new createError(http_status.BAD_REQUEST, 'invalid token.')
        // }

        // 3. if token valid -> then do query to get user's data
        const GET_USER = `SELECT * FROM users WHERE uid = ?;`
        const [ USER ] = await database.execute(GET_USER, [uid])

        // 4. create respond
        delete USER[0].password
        const respond = new createRespond(http_status.OK, 'keelogin', true, 1, 1, USER[0])
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