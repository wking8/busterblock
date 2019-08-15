import React, { Component } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import Header from '../Header/Header'
import './AllMovies.css'

export default class AllMovies extends Component {
    render() {
        return (
            <div className='all-movies'>
                <Header />
                <div className='movie-container'>
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                </div>

            </div>
        )
    }
}
