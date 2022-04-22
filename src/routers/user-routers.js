const router = require('express').Router()

// import controllers & middlewares
const auth = require('../helpers/authorization-token')
const { user } = require('../controllers')

// define routes
router.get('/users', auth, user.getUsers)
router.get('/users/:uid', user.getUsersByUid)
router.post('/users/register', user.register)
router.get('/auth/verify', user.verifyUser)
router.get('/auth/refresh/token', user.refreshToken)
router.post('/auth/login', user.login)
router.get('/auth/keeplogin', auth, user.keeplogin)

// export * modules
module.exports = router