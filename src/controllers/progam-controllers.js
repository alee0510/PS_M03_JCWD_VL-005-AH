const database = require('../config').promise()
const http_status = require('../helpers/http-status-code')
const createError = require('../helpers/create-error')
const createRespond = require('../helpers/create-respond')

module.exports.getPrograms = async (req, res) => {
    try {
        // define query
        const GET_PROGRAMS = `SELECT * FROM program;`
        const [ PROGRAM ] = await database.execute(GET_PROGRAMS)

        const GET_PROGRAMS_COUNT = `SELECT COUNT(*) AS total FROM program;`
        const [ COUNT ] = await database.execute(GET_PROGRAMS_COUNT)
        console.log('count :', COUNT)

        // create respond
        const respond = new createRespond(http_status.OK, 'get', true, COUNT[0].total, COUNT[0].total, PROGRAM)
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