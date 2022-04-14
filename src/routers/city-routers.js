const routers = require('express').Router()

// import controllers
const { city } = require('../controllers')

// define routes
routers.get('/city', city.getCity)

// export routers
module.exports = routers