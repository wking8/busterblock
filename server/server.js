require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const ctrl = require('./controller')

const app = express()

app.use(express.json())
// Session


// Endpoints


// Listener and DB hook up
massive(CONNECTION_STRING)
.then(db => {
    app.set('db', db)
    app.listen(PORT, () => console.log(`This better be running on port ${PORT}`))
})

