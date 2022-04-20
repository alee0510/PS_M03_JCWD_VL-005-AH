const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'ali.muksin0510@gmail.com',
        pass : process.env.MAIL_PASS
    },
    tls : { rejectUnauthorized : false }
})