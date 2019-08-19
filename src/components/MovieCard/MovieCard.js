import React, { Component } from 'react'
import Rental from '../Rental/Rental'
import axios from 'axios';
import './MovieCard.css'


export default class MovieCard extends Component {
    render() {
        return (
            <div className='movie-card grow'>
                <Rental />
                <img src={this.props.poster} alt="poster" />
            </div>
        )
    }
}