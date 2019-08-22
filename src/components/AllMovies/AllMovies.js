import React, { Component } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import Header from '../Header/Header'
import './AllMovies.scss'
import Footer from '../Footer/Footer'
import { connect } from 'react-redux'
import { getAllMovies } from '../../ducks/reducer'

class AllMovies extends Component {
    componentDidMount() {
        this.props.getAllMovies()
    }
    render() {
        let mappedMovies;
        // if there is a search term and a the results array is empty then no results
        if (this.props.searchTerm && this.props.searchResults.length === 0) {
            mappedMovies = <div className='typewriter'><p>
                <h1>No results...</h1>
            </p>
            </div>
        } else {
            // else check if there are any items in the results array
            mappedMovies = this.props.searchResults.length > 0
                ? this.props.searchResults.map(element => {
                    return <MovieCard
                        poster={element.poster}
                        imdbid={element.imdbid}
                        actors={element.actors}
                        deleteMovie={this.deleteMovie}
                    />
                })
                // returning the original array if nothing is searched
                : this.props.movieData.map(element => {
                    return <MovieCard
                        poster={element.poster}
                        imdbid={element.imdbid}
                        actors={element.actors}
                        deleteMovie={this.deleteMovie}
                    />
                })
        }
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

// Bringing in my state through props from the reducer
const mapStateToProps = store => ({
    movieData: store.movieData,
    searchResults: store.searchResults,
    searchTerm: store.searchTerm
})
// Look into shorthand for brining in all of redux state with 'state => state'
export default connect(mapStateToProps, { getAllMovies })(AllMovies)
