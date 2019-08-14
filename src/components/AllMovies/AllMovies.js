import React, { Component } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import Header from '../Header/Header'

export default class AllMovies extends Component {
    render() {
        return (
            <div>
                <button>LOGOUT</button>
                <MovieCard />
                <Header />
            </div>
        )
    }
}