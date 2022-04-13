const routers = require('express').Router()

// import controllers
const { student } = require('../controllers')

// define routes
routers.get('/students', student.getStudents)
routers.get('/students/:studentId', student.getStudentById)
routers.post('/students', student.postStudent)
routers.patch('/students/:studentId', student.patchStudent)
routers.delete('/students/:studentId', student.deleteStudent)

// export * modules
module.exports = routers