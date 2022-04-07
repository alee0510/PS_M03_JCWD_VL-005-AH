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