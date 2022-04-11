const http_status = require('../helpers/http-status-code')

class NewError {
    constructor (
        httpStatusCode = http_status.INTERNAL_SERVICE_ERROR, 
        message = 'Internal service error.'
    ) {
        this.status = httpStatusCode
        this.message = message
    }
}

module.exports = NewError