const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

const database = require('./config')

// define main app
const app = express()

// config middleware
app.use(express.json())
app.use(cors())

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

// binding to local port
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`API is running at port : ${PORT}.`))