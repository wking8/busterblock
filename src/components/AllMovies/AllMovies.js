import React, { Component } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import Header from '../Header/Header'
import './AllMovies.css'

export default class AllMovies extends Component {
    render() {
        return (
            <div className='all-movies'>
                <Header />
                <hr class='border'></hr>
                <div className='movie-container'>
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                </div>
                <hr class='border'></hr>
            </div>
        )
    }
}
