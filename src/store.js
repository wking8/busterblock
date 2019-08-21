import { createStore, compose, applyMiddleware } from 'redux'
import reducer from './ducks/reducer'
import thunk from 'redux-thunk'


const middleware = [thunk]

export default compose(applyMiddleware(...middleware)(createStore))(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
