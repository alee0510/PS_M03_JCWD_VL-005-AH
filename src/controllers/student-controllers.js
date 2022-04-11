const database = require('../config').promise()
const createError = require('../helpers/create-error')
const createRespond = require('../helpers/create-respond')
const http_status = require('../helpers/http-status-code')

// GET : all students data
module.exports.getStudents = async (req, res) => {
    // define query
    const GET_STUDENTS = `
        SELECT st.id, st.studentId, st.name, st.email, pg.program, ct.city
        FROM students AS st
        JOIN program AS pg ON pg.id = st.programId
        JOIN city AS ct ON ct.id = st.cityId
        LIMIT 5;
    `

    // execute query
    try {
        const [ STUDENTS ] = await database.execute(GET_STUDENTS)

        const respond = new createRespond(http_status.OK, 'GET', true, 50, 5, STUDENTS)
        res.status(respond.status).send(respond)
    } catch (error) {
        console.log('error : ', error)
        res.status(500).send('Internal service error.')
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
            error = new createError()
            console.log(error)
        }
        res.status(error.status).send(error)
    }
}

// PRACTICES
// URL : GET /api/students
// DO : pagination -> QUERY => ?_page=1&_limit=5