// Setting initial Redux state
const initialState = {
    username: '',
    email: '',
    profilePic: ''
}

// Action Constants
const SET_USER = 'SET_USER'



// Action Builders
export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}



// Reducer
export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_USER:
            const { username, email } = payload
            return { ...state, username, email }
        default: return state
    }
}