import React, { Component } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import Header from '../Header/Header'
import './AllMovies.css'
import Footer from '../Footer/Footer'
import axios from 'axios'

export default class AllMovies extends Component {
    state = {
        movieData: []
    }
    componentDidMount() {
        axios.get(`api/movies`)
            .then(res => {
                this.setState({ movieData: res.data })
            })
    }
    deleteMovie = async (imdbid) => {
        const data = await axios.delete(`/api/deleteMovie/${imdbid}`)
        this.setState({ movieData: data.data })
    }
    render() {
        const mappedMovies = this.state.movieData.map(element => {
            return <MovieCard
                poster={element.poster}
                imdbid={element.imdbid}  
                deleteMovie={this.deleteMovie}
            />
        })
        return (
            <div className='all-movies'>
                <Header />
                <hr class='hr'></hr>
                <div className='movie-container'>
                    {mappedMovies}

                </div>
                <hr class='hr'></hr>
                <div>
                    <Footer />
                </div>
            </div>
        )
    }
}
