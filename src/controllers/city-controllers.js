const database = require('../config').promise()
const http_status = require('../helpers/http-status-code')
const createError = require('../helpers/create-error')
const createRespond = require('../helpers/create-respond')

module.exports.getCity = async (req, res) => {
    try {
        // define query
        const GET_CITY = `SELECT * FROM city;`
        const [ CITY ] = await database.execute(GET_CITY)

        const GET_TOTAL_CITY = `SELECT COUNT(*) AS total FROM city;`
        const [ TOTAL ] = await database.execute(GET_TOTAL_CITY)

        // create respond
        const respond = new createRespond(http_status.OK, 'get', true, TOTAL[0].total, TOTAL[0].total, CITY)
        res.status(respond.status).send(respond)
    } catch (error) {
        const isTrusted = error instanceof createError
        if (!isTrusted) {
            error = new createError(http_status.INTERNAL_SERVICE_ERROR, error.sqlMessage)
            console.log(error)
        }
        res.status(error.status).send(error)
    }
}