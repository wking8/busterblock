import React, { Component } from 'react'
import Rental from '../Rental/Rental'
import axios from 'axios';
import './MovieCard.css'


export default class MovieCard extends Component {
    state = {
        movieData: []
    }
    componentDidMount() {
        axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_APIKEY}&i=tt1276104`)
            .then(res => {
                this.setState({ movieData: [res.data] })
            })
    }
    render() {
        const mappedMovies = this.state.movieData.map(element => {
            return <div id='movie-img'>
                <img src={element.Poster} alt="" />
            </div>
        })
        return (
            <div className='movie-card grow'>
                <Rental />
                {mappedMovies}

            </div>
        )
    }
}