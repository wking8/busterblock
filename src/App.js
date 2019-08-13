import React, { Component } from 'react';
import './App.css';
import AllMovies from './components/AllMovies/AllMovies'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import routes from './routes'

class App extends Component {
  render() {
    return (
      <div className="App" >
        <Login />
        <AllMovies />
        <Footer />
        {routes}
      </div>
    );
  }
}

export default App;
