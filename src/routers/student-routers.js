const routers = require('express').Router()

// import controllers
const { student } = require('../controllers')

// define routes
routers.get('/', student.getStudents)
routers.get('/:studentId', student.getStudentById)
routers.post('/', student.postStudent)
routers.patch('/:studentId', student.patchStudent)
routers.delete('/:studentId', student.deleteStudent)

// export * modules
module.exports = routers