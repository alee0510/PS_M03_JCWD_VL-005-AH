const routes = require('express').Router()

// import client controllers
const { client } = require('../controllers')

// define routes
routes.get('/clients', client.getClients)
routes.get('/clients/:id', client.getClientById)
routes.post('/clients', client.postClient)
routes.patch('/clients/:id', client.patchClient)
routes.delete('/clients/:id', client.deleteClient)

// export routes
module.exports = routes