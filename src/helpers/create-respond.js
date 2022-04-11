const http_status = require('./http-status-code')

class NewRespond {
    constructor (
        status = http_status.OK,
        operation,
        isSuccess = true,
        total_count,
        success_count,
        data = [],
    ) {
        this.status = status,
        this.operation = operation,
        this.isSuccess = isSuccess,
        this.total_count = total_count,
        this.success_count = success_count,
        this.data = data
    }
}

module.exports = NewRespond