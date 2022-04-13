const routers = require('express').Router()

// import controllers
const { program } = require('../controllers')

// define routes
routers.get('/programs', program.getPrograms)

// export routers
module.exports = routers