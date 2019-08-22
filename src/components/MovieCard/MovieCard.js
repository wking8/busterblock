import React, { Component } from 'react'
import Rental from '../Rental/Rental'
import './MovieCard.scss'
import { connect } from 'react-redux'
import { deleteMovie } from '../../ducks/reducer'



class MovieCard extends Component {
    render() {
        return (    
            <div className='movie-card grow'>
                <Rental />
                <img src={this.props.poster} alt="poster" />
                <button
                    className='delete-btn grow'
                    onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.props.deleteMovie(this.props.imdbid) }}>
                    Delete
                </button>
            </div>
        )
    }
}

export default connect(null, { deleteMovie })(MovieCard)

