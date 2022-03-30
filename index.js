// import
const express = require('express')
const fs = require('fs')
const path = require('path')

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

// binding app into localhost
const PORT = 5000
app.listen(PORT, () => console.log(`API running at port : ${PORT}`))