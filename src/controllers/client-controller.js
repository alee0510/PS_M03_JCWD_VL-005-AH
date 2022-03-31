const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const { post_schema, patch_schema } = require('../helpers/schema')
const __dir = './__json__'

const getClients = (req, res) => {
    // request query params
    fs.readFile(
        path.join(__dir + '/clients.json'),
        (error, data) => {
            if (error) {
                return res.status(500).send(`Internal Service Error.`)
            }

            res.status(200).send(JSON.parse(data))
        }
    )
}

const getClientById = (req, res) => {
    const id = req.params.id
    console.log('id : ', id)

    // check data
    fs.readFile(
        path.join(__dir + '/clients.json'),
        (error, data) => {
            if (error) {
                return res.status(500).send(`Internal Service Error.`)
            }

            // parse data
            const clients = JSON.parse(data)
            let client
            for (let i = 0; i < clients.length; i++) {
                if (clients[i].id === id) {
                    client = clients[i]
                }
            }
            if (client === undefined) {
                return res.status(404).send(`client with id : ${id} doesn't found.`)
            }

            // if client exist
            res.status(200).send(client)
        }
    )
}

const postClient = (req, res) => {
    let body = req.body

    // validate req.body
    const { error } = post_schema.validate(body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    // create generic unique identifier or UID
    const uid = uuid.v4().toUpperCase()
    body.id = uid

    // read data
    fs.readFile(
        path.join(__dir + '/clients.json'),
        (error, data) => {
            if (error) {
                console.log('error : ', error)
                return res.status(500).send(`Internal Service Error.`)
            }
            
            // parse data
            const clients = JSON.parse(data)
            
            // validation -> check duplicate
            // name, email, bank_account, phone
            let unique = true
            for (let i = 0; i < clients.length; i++) {
                if (clients[i].name === body.name) {
                    unique = false
                    break
                }
                if (clients[i].email === body.email) {
                    unique = false
                    break
                }
                if (clients[i].bank_account === body.bank_account) {
                    unique = false
                    break
                }
                if (clients[i].phone === body.phone) {
                    unique = false
                    break
                }
            }
            
            if (!unique) {
                return res.status(400).send(`username, email, phone, & bank account has already exist.`)
            }

            // add new data
            clients.push(body)

            // update data to clients.json
            fs.writeFile(
                path.join(__dir + '/clients.json'),
                JSON.stringify(clients, null, 2),
                (error) => {
                    if (error) {
                        console.log('error : ', error)
                        return res.status(500).send(`Internal Service Error.`)
                    }

                    res.status(201).send(`client with id : ${uid} has been created.`)
                }
            )
        }
    )
}

const patchClient = (req, res) => {
    const id = req.params.id
    const body = req.body

    // validate req.body
    const { error } = patch_schema.validate(body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    // validate id
    const valid =  uuid.validate(id.toLowerCase())
    if(!valid) {
        return res.status(400).send(`Bad Request : ID doesn't valid.`)
    }

    // read data from clients.json
    fs.readFile(
        path.join(__dir + '/clients.json'),
        (error, data) => {
            if (error) {
                console.log('error : ', error)
                return res.status(500).send(`Internal Service Error.`)
            }

            // check data
            const clients = JSON.parse(data)
            let index
            for (let i = 0; i < clients.length;  i++) {
                if (clients[i].id === id) {
                    index = i
                    break
                }
            }
            if (index === undefined) {
                return res.status(404).send(`client with id : ${id} doesn't found.`)
            }

            // if exist -> do update
            clients[index] = Object.assign(clients[index], body)

            // update file clients.json
            fs.writeFile(
                path.join(__dir + '/clients.json'),
                JSON.stringify(clients, null, 2),
                (error) => {
                    if (error) {
                        console.log('error : ', error)
                        return res.status(500).send(`Internal Service Error.`)
                    }

                    res.status(201).send(`client with id : ${id} has been updated.`)
                }
            )
        }
    )
}

const deleteClient = (req, res) => {
    const id = req.params.id
    console.log('id : ', id)
    
    // validate id
    const valid =  uuid.validate(id.toLowerCase())
    console.log('valid : ', valid)
    if (!valid) {
        return res.status(400).send(`Bad Request : ID doesn't valid.`)
    }

    // read data
    fs.readFile(
        path.join(__dir + '/clients.json'),
        (error, data) => {
            if (error) {
                console.log('error : ', error)
                return res.status(500).send(`Internal Service Error.`)
            }

            // parse data
            const clients = JSON.parse(data)

            // check data by id
            let index
            for (let i = 0; i < clients.length; i++) {
                if (clients[i].id === id) {
                    index = i
                    break
                }
            }

            if (index === undefined) {
                return res.status(404).send(`client with id: ${id} doesn't found.`)
            }

            // if exist
            clients.splice(index, 1)

            // update file clients.json
            fs.writeFile(
                path.join(__dir + '/clients.json'),
                JSON.stringify(clients, null, 2),
                (error) => {
                    if (error) {
                        console.log('error : ', error)
                        return res.status(500).send(`Internal Service Error.`)
                    }

                    res.status(201).send(`client with id : ${id} has been deleted.`)
                }
            )
        }
    )
}

module.exports = { 
    getClients, 
    getClientById, 
    postClient, 
    patchClient, 
    deleteClient 
}