import React, { Component } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import Header from '../Header/Header'
import axios from 'axios'
import { logout } from '../../ducks/reducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class AllMovies extends Component {
    logout = () => {
        axios.delete('/auth/logout')
            .then(() => {
                this.props.logout()
                this.props.history.push(`/`)
            })
    }
    render() {
        return (
            <div>
                <Header />
                <button onClick={this.logout}>LOGOUT</button>
                <MovieCard />
            </div>
        )
    }
}

export default connect(
    null,
    { logout }
)(withRouter(AllMovies))