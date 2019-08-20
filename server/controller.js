const bcrypt = require('bcryptjs')
const axios = require('axios')

module.exports = {
    // All authentication controllers
    register: async (req, res) => {
        const db = req.app.get('db')
        const { username, email, password } = req.body
        const user = await db.find_email([email])
        if (user.length > 0) {
            return res.status(400).send({ message: 'Email in use' })
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const regUser = await db.insert_user_information({ username, email })
        db.add_hash({ hash, user_id: regUser[0].user_id })
            .then(() => {
                db.myaccount({ user_id: regUser[0].user_id, profile_pic: regUser[0].profile_pic })
                req.session.user = regUser[0]
                res.status(200).send({
                    message: 'Logged in',
                    user: req.session.user,
                    loggedIn: true
                })
            })
            .catch(err => {
                res.status(500).send({ message: 'Failed to Register' })
            })
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const { email, password } = req.body
        const user = await db.hash_and_email([email])
        if (user.length === 0) {
            return res.status(400).send({ message: 'No email found' })
        }
        const result = bcrypt.compareSync(password, user[0].hash)
        if (result) {
            delete user[0].hash
            req.session.user = user[0]
            return res.status(200).send({ message: 'Logged in!', user: req.session.user, loggedIn: true })
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send({ message: 'Logged out', loggedIn: false })
    },
    // All User controllers - get all, edit and delete
    getUsers: async (req, res) => {
        const db = req.app.get('db')
        const users = await db.get_all_users()
        return res.status(200).send(users)
    },
    editUsername: async (req, res) => {
        const db = req.app.get('db')
        const { username, newUser } = req.body
        try {
            await db.update_username({ username, newUser })
            res.status(202).end()
        }
        catch (err) {
            res.status(500).end()
        }
    },
    deleteUser: async (req, res) => {
        const db = req.app.get('db')
        const { username } = req.params
        try {
           const data = await db.delete_user({ username })
            res.status(200).send(data)
        }
        catch (err) {
            // console.log('\n\n\n', err, '\n\n\n')
            res.status(500).end()
        }
    },
    // All movie related controllers
    searchMovie: async (req, res) => {
        const { searchTerm } = req.body
        const { data } = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_APIKEY}&s=${searchTerm}`)
        res.status(200).send(data)
    },
    addMovie: async (req, res) => {
        const { imdbID } = req.body
        const { data } = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_APIKEY}&i=${imdbID}`)
        const { Title, Director, Actors, Year, Poster } = data
        const db = req.app.get('db')
        await db.add_movie({ Title, Director, Actors, Poster, Year, imdbID })
        res.status(200).send({ title: Title })
    },
    getAll: async (req, res) => {
        const db = req.app.get('db')
        const data = await db.get_all_movies()
        return res.status(200).send(data)
    },
    deleteMovie: async (req, res) => {
        const db = req.app.get('db')
        const { imdbID } = req.params
        try {
            await db.delete_movie({ imdbID })
            res.status(200).send( imdbID )
        }
        catch (err) {
            // console.log('\n\n\n', err, '\n\n\n')
            res.status(500).end()
        }
    }
}

