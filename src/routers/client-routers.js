const routers = require('express').Router()

// import controller
const { client } = require('../controllers')

// define route
routers.get('/clients', client.getClients)

// epxort routers
module.exports = routers