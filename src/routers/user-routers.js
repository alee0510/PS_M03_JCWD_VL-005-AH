const router = require('express').Router()

// import controllers
const { user } = require('../controllers')

// define routes
router.get('/users', user.getUsers)
router.get('/users/:uid', user.getUsersByUid)
router.post('/users/register', user.register)
router.get('/auth/verify', user.verifyUser)
router.get('/auth/refresh/token', user.refreshToken)

// export * modules
module.exports = router