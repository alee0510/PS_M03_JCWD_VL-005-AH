const router = require('express').Router()

// import controllers
const { user } = require('../controllers')

// define routes
router.get('/users', user.getUsers)
router.get('/users/:uid', user.getUsersByUid)
router.post('/users/register', user.register)
router.get('/auth/verify', user.verifyUser)

// export * modules
module.exports = router