import React, { Component } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import Header from '../Header/Header'
import './AllMovies.css'
import Footer from '../Footer/Footer'

export default class AllMovies extends Component {
    render() {
        return (
            <div className='all-movies'>
                <Header />
                <hr class='hr'></hr>
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
                <hr class='hr'></hr>
                    <div>
                        <Footer />
                    </div>
            </div>
        )
    }
}
