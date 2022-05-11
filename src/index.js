const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

const database = require('./config')

// define main app
const app = express()

// url logger : GET /api/students
// custom middleware
function urlRequestLogger (req, res, next) {
    console.log(`${req.method} : ${req.url}`)
    next()
}

// config middleware
app.use(express.json()) // req.body
app.use(cors({ exposedHeaders : ['UID', 'Auth-Token'] }))
app.use(urlRequestLogger)

// open access to public folder
app.use(express.static('public'))

// test database connection
database.connect((error) => {
    if (error) {
        console.log('error : ', error)
    }
    console.log(`database is connected, threadId : ${database.threadId}.`)
})

// define main route
app.get('/', (req, res) => res.status(200).send('<h1>Wellcome to My RESTAPIs</h1>'))

// setup routes
const routers = require('./routers')
app.use('/api', routers.client_routers)
app.use('/api', routers.student_routers)
app.use('/api', routers.program_routers)
app.use('/api', routers.city_routers)
app.use('/api', routers.user_routers)
app.use('/api', routers.upload_routers)

// binding to local port
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`API is running at port : ${PORT}.`))