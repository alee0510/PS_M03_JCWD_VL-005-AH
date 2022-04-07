const routers = require('express').Router()

// import controller
const { client } = require('../controllers')

// define route
routers.get('/clients', client.getClients)
routers.get('/clients/:id', client.getClientById)
routers.post('/clients', client.addNewClient)

// epxort routers
module.exports = routers