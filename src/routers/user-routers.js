const router = require('express').Router()

// import controllers
const { user } = require('../controllers')

// define routes
router.post('/users/register', user.register)

// export * modules
module.exports = router