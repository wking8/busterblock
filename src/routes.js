import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import AllMovies from './components/AllMovies/AllMovies'
import Rental from './components/Rental/Rental'
import Admin from './components/Admin/Admin'

export default (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/allmovies' component={AllMovies} />
        <Route path='/rental' component={Rental} />
        <Route path='/admin' component={Admin} />
    </Switch>
)

