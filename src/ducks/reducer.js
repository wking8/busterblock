import axios from 'axios'

// Setting initial Redux state
const initialState = {
    username: '',
    email: '',
    profilePic: '',
    movieData: [],
    searchResults: [],
    searchTerm: ''
}

// Action Constants
const SET_USER = 'auth/SET_USER'
const LOGOUT = 'auth/LOGOUT'
const GET_ALL_MOVIES = 'movies/GET_ALL_MOVIES'
const UPDATE_SEARCH_TERM = 'movies/UPDATE_SEARCH_TERM'
const DELETE_MOVIE = 'movies/DELETE_MOVIE'



// Action Builders
export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}
export function logout() {
    return {
        type: LOGOUT
    }
}
export const getAllMovies = () => async (dispatch) => {
    const { data } = await axios.get(`api/movies`)
    dispatch({
        type: GET_ALL_MOVIES,
        payload: data
    })
}
export const deleteMovie = (imdbid) => async (dispatch) => {
    await axios.delete(`/api/deleteMovie/${imdbid}`)
    dispatch(getAllMovies())
    dispatch({
        type: DELETE_MOVIE,
        payload: imdbid
    })
}
export const updateSearchTerm = (searchTerm) => (dispatch) => {
    dispatch({
        type: UPDATE_SEARCH_TERM,
        payload: searchTerm
    })
}


// Reducer
export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case DELETE_MOVIE:
            return {
                imdbid: payload,
                ...state
            }
        case UPDATE_SEARCH_TERM:
            // TODO add check to make sure movieData is not null
            const results = state.movieData.map(movie => movie.title.toLowerCase().includes(payload.toLowerCase()) ? movie : null ||
                movie.actors.toLowerCase().includes(payload.toLowerCase()) ? movie : null);
            return {
                ...state,
                searchTerm: payload,
                searchResults: [...results].filter(Boolean)
            }
        case GET_ALL_MOVIES:
            return { ...state, movieData: [...payload] }
        case SET_USER:
            const { username, email } = payload
            return { ...state, username, email }
        case LOGOUT:
            return initialState
        default: return state
    }
}