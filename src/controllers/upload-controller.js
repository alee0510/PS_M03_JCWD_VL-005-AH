const database = require('../config').promise()
const createError = require('../helpers/create-error')
const createRespond = require('../helpers/create-respond')
const http_status = require('../helpers/http-status-code')

module.exports.add = async (req, res) => {
    try {
        if (!req.file) {
            throw new createError(400, 'bad request : file not found.')
        }

        // save file path to our database
        const ADD_PROFILE_IMAGE = `
            UPDATE profile 
            SET image = '/profiles/${req.file.filename}'
            WHERE uid = 'a7c50c97-ad6f-4279-9af4-f21c0bc21686';
        `
        console.log(ADD_PROFILE_IMAGE)
       
        await database.execute(ADD_PROFILE_IMAGE)
        
        const respond = new createRespond(http_status.OK, 'upload', true, 1, 1, 'image has been uploaded.')
        res.status(respond.status).send(respond)
    } catch (error) {
        console.log('error : ', error)
        // delete file 
        
        const isTrusted = error instanceof createError
        if (!isTrusted) {
            error = new createError(http_status.INTERNAL_SERVICE_ERROR, error.sqlMessage)
            console.log(error)
        }
        res.status(error.status).send(error)
    }
}

// update image ?
