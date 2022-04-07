const database = require('../config').promise()

// module.exports.getClients = (req, res) => {
//     // do query to get all client data
//     const GET_CLIENT = 'SELECT * FROM clients;'
//     database.execute(GET_CLIENT, (error, result) => {
//         if (error) {
//             console.log('error : ', error)
//             res.status(500).send('Internal service error.')
//         }

//         // send data to client
//         res.status(200).send(result)
//     })
// }

// model 2 : promise wrapper
module.exports.getClients = async (req, res) => {
    // define query
    const GET_CLIENT = 'SELECT * FROM clients;'

    // execute query
    try {
        const [ data ] = await database.execute(GET_CLIENT)
        console.log(data)

        res.status(200).send(data)
    } catch (error) {
        console.log('error : ', error)
        res.status(500).send('Internal service error.')
    }
}

// PRACTICES :
// GET : get client by id
// POST : add new client
module.exports.getClientById = async (req, res) => {
    const id = Number(req.params.id)
    try {
        const GET_CLIENT_BY_ID = `SELECT * FROM clients WHERE id = ?;`
        const [ data ] = await database.execute(GET_CLIENT_BY_ID, [id])

        // check
        if (!data.length) {
            res.status(404).send(`client with id: ${id} doesn't found.`)
        }

        // if success
        res.status(200).send(data[0])
    } catch (error) {
        console.log('error : ', error)
        res.status(500).send('Internal service error.')
    }
}

module.exports.addNewClient = async (req, res) => {
    const { name, email, phone, credit, city } = req.body
    try {
        const ADD_NEW_CLIENT = `INSERT INTO clients(name, email, phone, credit, city) VALUES ('${name}', '${email}', '${phone}', '${credit}', '${city}' );`
        const [ info ] = await database.execute(ADD_NEW_CLIENT)

        res.status(201).send({ ...req.body, id : info.insertId })
    } catch (error) {
        console.log('error : ', error)
        res.status(500).send('Internal service error.')
    }
}