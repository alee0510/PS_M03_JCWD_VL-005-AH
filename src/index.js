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

function private (req, res, next) {
    if (!req.token) {
        res.status(401).send('Un-authorized.')
    }

    next()
}

// config middleware
app.use(express.json())
app.use(cors())
app.use(urlRequestLogger)

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
app.use('/api', private, routers.student_routers)
app.use('/api', routers.program_routers)
app.use('/api', routers.city_routers)

// binding to local port
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`API is running at port : ${PORT}.`))