import React, { Component } from 'react'
import Rental from '../Rental/Rental'
import './MovieCard.css'


export default class MovieCard extends Component {
    render() {
        return (
            <div className='movie-card grow'>
                <Rental />
                <img src={this.props.poster} alt="poster" />
                <button
                    onClick={() => this.props.deleteMovie(this.props.imdbid)}
                    className='delete-btn'>Delete
                </button>
            </div>
        )
    }
}