// import
const express = require('express')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')

// initialize express app
const app = express()

// initialize middleware
app.use(express.json())

// home route
app.get('/', (req, res) => {
    res.status(200).send(`<h1>Wellcome to my REST APIs</h1>`)
})

// GET : clients
app.get('/api/clients', (req, res) => {
    fs.readFile(
        path.join(__dirname + '/clients.json'),
        (error, data) => {
            if (error) {
                return res.status(500).send(`Internal Service Error.`)
            }

            res.status(200).send(JSON.parse(data))
        }
    )
})

// GET : client by id
app.get('/api/clients/:id', (req, res) => {
    const id = req.params.id
    console.log('id : ', id)

    // check data
    fs.readFile(
        path.join(__dirname + '/clients.json'),
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
})

// POST : add new client data
// URL : /api/clients
// BODY : {...} without id, id will be generated in server side

// 1. get body => validate ? make sure its not empty
// 2. readFile => raw_data => parse => data
// 3. data => push new client data
// 4. writeFile => data => JSON.stringfy()
app.post('/api/clients', (req, res) => {
    let body = req.body

    // validation
    if (!body.hasOwnProperty('name')) {
        return res.status(400).send(`Bad Request : body cannot be empty.`)
    }

    // TODO : PR
    // 1. create function to validate req.body
    //  - name ? max 13 chars not include number
    //  - email ? must valid email, domain [com], provider [google, hotmail, aol, icloud, outlook, yahoo, protonmail]
    //  - phone ? format : +62-xxx-xxxx-xxxx
    //  - credit ? format : $1,000

    // 2. create protection -> make sure no duplicate data in our clients.json
    //  - name, phone, email, & bank account
    //  - if duplicate ? res 'name, phone, email, bank_account already exist'

    // create generic unique identifier or UID
    const uid = uuid.v4().toUpperCase()
    body.id = uid

    // read data
    fs.readFile(
        path.join(__dirname + '/clients.json'),
        (error, data) => {
            if (error) {
                console.log('error : ', error)
                return res.status(500).send(`Internal Service Error.`)
            }
            
            // parse data
            const clients = JSON.parse(data)
            clients.push(body)

            // update data to clients.json
            fs.writeFile(
                path.join(__dirname + '/clients.json'),
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
})


// PATCH : update clients data
// URL : api/clients/:id
// BODY : {...}
app.patch('/api/clients/:id', (req, res) => {
    const id = req.params.id
    const body = req.body

    // validate body
    if (body === undefined) {
        return res.status(400).send(`Bad Request : body cannot be empty.`)
    }

    // validate id
    const valid =  uuid.validate(id.toLowerCase())
    if(!valid) {
        return res.status(400).send(`Bad Request : ID doesn't valid.`)
    }

    // read data from clients.json
    fs.readFile(
        path.join(__dirname + '/clients.json'),
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
                path.join(__dirname + '/clients.json'),
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
})

// TODO :
// DELETE : delete data by id
// URL : /api/clients/:id

// binding app into localhost
const PORT = 5000
app.listen(PORT, () => console.log(`API running at port : ${PORT}`))