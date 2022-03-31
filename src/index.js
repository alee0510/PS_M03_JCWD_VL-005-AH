// import
const express = require('express')

// initialize express app
const app = express()

// initialize middleware
app.use(express.json())

// home route
app.get('/', (req, res) => {
    res.status(200).send(`<h1>Wellcome to my REST APIs</h1>`)
})

// setup routes
const routes = require('./routers')
app.use('/api', routes.clientRoutes)

// binding app into localhost
const PORT = 5000
app.listen(PORT, () => console.log(`API running at port : ${PORT}`))