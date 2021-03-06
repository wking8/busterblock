require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const ctrl = require('./controller')
// const http = require("http");
// const socketIo = require("socket.io");
// const index = require("./routes/index");

const app = express()

// app.use(index);
app.use( express.static( `${__dirname}/../build` ) );   
app.use(express.json())
// Session
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 10
    }
}))

// const server = http.createServer(app);
// const io = socketIo(server); // < Interesting!
// const getApiAndEmit = "TODO"

// Endpoints
app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)
app.delete('/auth/logout', ctrl.logout)
app.get('/admin/users', ctrl.getUsers)
app.put('/admin/editUsername', ctrl.editUsername)
app.post('/admin/searchMovie', ctrl.searchMovie)
app.post('/admin/addMovie', ctrl.addMovie)
app.delete('/admin/deleteUser/:username', ctrl.deleteUser)
app.get('/api/movies', ctrl.getAll)
app.delete('/api/deleteMovie/:imdbID', ctrl.deleteMovie)


// Listener and DB hook up
massive(CONNECTION_STRING)
.then(db => {
    app.set('db', db)
    app.listen(PORT, () => console.log(`This better be running on port ${PORT}`))
})

