// import
const express = require('express')

// initialize express app
const app = express()

// initialize middleware
app.use(express.json())

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
app.get('/api/students/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log('id : ', id)

    // search data in database base on id
    const data =  students.filter(student => student.id === id)
    console.log('data : ', data)

    // check data
    if (!data.length) {
        return res.status(404).send(`student with id : ${id} doesn't found.`)
    }

    // if data exist
    res.status(200).send(data[0])
})
// 3. CREATE DATA
app.post('/api/students', (req, res) => {
    const data = { ...req.body }
    console.log('body : ', data)

    // validate data
    const valid = data.hasOwnProperty('name')
    console.log('valid : ', valid)

    if(!valid) {
        return res.status(400).send(`Bad Request : data is not valid.`)
    }

    // add to database
    data.id = students.length + 1
    students.push(data)
    
    // send respond to client side
    res.status(201).send(data)
})
// 4. UPDATE DATA
// 4.a PUT -> overwrite value/data -> change entire value/data -> 
// { name : 'ale', role : 'software engineer' } => PUT ({ name : 'alfon' }) => { 'name : 'alfon' }
// 4.b PATCH -> partial update -> PATCH({ name : 'alfon' }) => { name : 'alfon', role : 'software engineer' }
app.patch('/api/students/:id', (req, res) => {
    const id = Number(req.params.id)
    const body = req.body
    console.log('id : ', id)
    console.log('body : ', body)

    // check data
    let index
    for (let i = 0; i < students.length; i++) {
        if(students[i].id === id) {
            index = i
            break
        }
    }

    if (index === undefined) {
        return res.status(404).send(`student with id : ${id} doesn't found.`)
    }

    // if exist
    students[index] = Object.assign(students[index], body)
    res.status(200).send(`student with id : ${id} has been updated.`)
})

// 5. DELETE DATA
app.delete('/api/students/:id', (req, res) => {
    const id = Number(req.params.id)
    
    // check data
    let index
    for (let i = 0; i < students.length; i++) {
        if(students[i].id === id) {
            index = i
            break
        }
    }

    if (index === undefined) {
        return res.status(404).send(`student with id : ${id} doesn't found.`)
    }

    // if exist => do delete
    students.splice(index, 1)
    res.status(200).send(`student with id : ${id} has been deleted.`)
})

// binding app into localhost
const PORT = 5000
app.listen(PORT, () => console.log(`API running at port : ${PORT}`))