// import
const express = require('express')

// initialize express app
const app = express()

// database
const students = [
    { id : 1, name : 'Alfon', program : 'Fullstack Web Development' },
    { id : 2, name : 'Firas', program : 'Digital Darketing' },
    { id : 3, name : 'Cindy', program : 'UI/UX Designer' }
]

// home route
app.get('/', (request, respond) => {
    respond.status(200).send(`<h1>Wellcome to my REST APIs</h1>`)
})

// CRUD (CREATE, READ, UPDATE, & DELETE)
// 1. READ 1.0 -> all
app.get('/api/students', (req, res) => {
    res.status(200).send(students)
})
// 2. READ 1.1 -> get single data
// 3. CREATE DATA
// 4. UPDATE DATA
// 5. DELETE DATA

// binding app into localhost
const PORT = 5000
app.listen(PORT, () => console.log(`API running at port : ${PORT}`))