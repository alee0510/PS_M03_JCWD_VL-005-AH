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

    console.log('limit : ', limit, 'page : ', page)

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

        const respond = new createRespond(http_status.OK, 'GET', true, TOTAL[0].total, limit, STUDENTS)
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

        const respond = new createRespond(http_status.OK, 'GET', true, 1, 1, STUDENT[0])
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

// TODO : 1. POST : add new students, do input validation and error handling
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
        const respond = new createRespond(http_status.CREATED, 'POST', true, 1, 1, body)
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

// TODO : 2. PATCH : edit student data by its studentId, do input validation and error handling
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
        const UPDATE_STUDENTS = `UPDATE students SET ?;`
        

        res.status(200).send('ok')
    } catch (error) {
        const isTrusted = error instanceof createError
        if (!isTrusted) {
            error = new createError(http_status.INTERNAL_SERVICE_ERROR, error.sqlMessage)
            console.log(error)
        }
        res.status(error.status).send(error)
    }
}