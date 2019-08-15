import React, { Component } from 'react'
import Rental from '../Rental/Rental'
import './MovieCard.css'


export default class MovieCard extends Component {
    state = {
        movieData: {}
    }
    render() {
        return (
            <div className='movie-card'>

                <Rental />
            </div>
        )
    }
}