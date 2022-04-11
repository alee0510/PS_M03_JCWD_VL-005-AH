const routers = require('express').Router()

// import controllers
const { student } = require('../controllers')

// define routes
routers.get('/students', student.getStudents)
routers.get('/students/:studentId', student.getStudentById)

// export * modules
module.exports = routers