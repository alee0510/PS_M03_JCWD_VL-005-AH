const database = require('../config').promise()
const createError = require('../helpers/create-error')
const createRespond = require('../helpers/create-respond')
const http_status = require('../helpers/http-status-code')
const uuid = require('uuid')
const { postStudentSchema, patchStudentSchema } = require('../helpers/validation-schema')

// GET : all students data
module.exports.getStudents = async (req, res) => {
    // capture all request query params
    const limit = Number(req.query._limit) || 5
    const page = Number(req.query._page) || 1
    const offset = (page - 1) * limit
    const sort = req.query._sort || 'id'
    const order = req.query._order || 'ASC'

    // console.log('limit : ', limit, 'page : ', page)

    // define query
    const GET_STUDENTS = `
        SELECT st.id, st.studentId, st.name, st.email, pg.program, ct.city
        FROM students AS st
        JOIN program AS pg ON pg.id = st.programId
        JOIN city AS ct ON ct.id = st.cityId
        ORDER BY ${'st.' + sort} ${order}
        LIMIT ${database.escape(offset)}, ${database.escape(limit)};
    `
    const GET_TOTAL = `SELECT COUNT(*) AS total FROM students;`

    // execute query
    try {
        const [ STUDENTS ] = await database.execute(GET_STUDENTS)
        const [ TOTAL ] = await database.execute(GET_TOTAL)

        const respond = new createRespond(http_status.OK, 'get', true, TOTAL[0].total, limit, STUDENTS)
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

// GET : student data by studentId
module.exports.getStudentById = async (req, res) => {
    // get request params
    const studentId = req.params.studentId

    // define query
    const GET_STUDENT_BY_ID = `
        SELECT st.id, st.studentId, st.name, st.email, pg.program, ct.city
        FROM students AS st
        JOIN program AS pg ON pg.id = st.programId
        JOIN city AS ct ON ct.id = st.cityId
        WHERE st.studentId = ?;
    `

    // execute query
    try {
        const [ STUDENT ] = await database.execute(GET_STUDENT_BY_ID, [studentId])

        // data validation
        if (!STUDENT.length) {
            throw new createError(http_status.BAD_REQUEST, 'bad request.')
        }

        const respond = new createRespond(http_status.OK, 'get', true, 1, 1, STUDENT[0])
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

module.exports.postStudent = async (req, res) => {
    // capture body
    let body = req.body // { name : , email :, cityId :, programId : }

    try {
        // validasi body
        const { error } = postStudentSchema.validate(body)
        if (error) {
            console.log('error : ', error)
            throw new createError(http_status.BAD_REQUEST, error.details[0].message)
        }

        // validation duplicate data in database
        const CHECK_STUDENT = `SELECT id FROM students WHERE name = ? OR email = ?;`
        const [ STUDENT ] = await database.execute(CHECK_STUDENT, [body.name, body.email])
        if (STUDENT.length) {
            throw new createError(http_status.BAD_REQUEST, 'bad request.')
        }

        // create uid
        body.studentId = uuid.v4().toUpperCase()
        console.log('body : ', body)

        // define post query
        const INSERT_STUDENT = `
            INSERT INTO students(name, email, programId, cityId, studentId)
            VALUES(?, ?, ?, ?, ?);
        `
        const [ INFO ] = await database.execute(INSERT_STUDENT, Object.values(body))
        body.id = INFO.insertId

        // send res to client side
        const respond = new createRespond(http_status.CREATED, 'insert', true, 1, 1, body)
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

module.exports.patchStudent = async (req, res) => {
    // studentId
    const studentId = req.params.studentId
    const body = req.body

    try {
        // check student data by its studentId
        const CHECK_STUDENT = `SELECT id FROM students WHERE studentId = ?;`
        const [ STUDENT ] = await database.execute(CHECK_STUDENT, [studentId])
        if (!STUDENT.length) {
            throw new createError(http_status.NOT_FOUND, 'id not found.')
        }

        // is body empty
        const isEmpty = !Object.values(body).length
        if (isEmpty) {
            throw new createError(http_status.BAD_REQUEST, 'bad request.')
        }

        // validation for req.body
        const { error } = patchStudentSchema.validate(body)
        if (error) {
            console.log('error : ', error)
            throw new createError(http_status.BAD_REQUEST, error.details[0].message)
        }

        // define query update
        let values = []
        for (let key in body) {
            values.push(`${key} = '${body[key]}'`)
        }
        const UPDATE_STUDENTS = `UPDATE students SET ${values} WHERE studentId = ?;`
        console.log('query : ', UPDATE_STUDENTS)
        const [ INFO ] = await database.execute(UPDATE_STUDENTS, [studentId])
        console.log('info : ', INFO)

        // send respond to client-side
        const respond = new createRespond(http_status.OK, 'update', true, 1, 1, INFO.info)
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

// DELETE
module.exports.deleteStudent = async (req, res) => {
    // get studentId
    const studentId = req.params.studentId
    try {
        // check student data by its studentId
        const CHECK_STUDENT = `SELECT id FROM students WHERE studentId = ?;`
        const [ STUDENT ] = await database.execute(CHECK_STUDENT, [studentId])
        if (!STUDENT.length) {
            throw new createError(http_status.NOT_FOUND, 'id not found.')
        }

        // define query delete
        const DELETE_STUDENT = `DELETE FROM students WHERE studentId = ?;`
        const [ INFO ] = await database.execute(DELETE_STUDENT, [studentId])
        console.log('info : ', INFO)

        // send respond to client-side
        const respond = new createRespond(http_status.OK, 'delete', true, 1, 1, INFO.info)
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