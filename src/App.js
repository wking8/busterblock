import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header'
import AllMovies from './components/AllMovies/AllMovies'
import Rental from './components/Rental/Rental'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'

class App extends Component {
  render() {
    return (
      <div className="App" >
        <Login />
        <Header />
        <AllMovies />
        <Rental />
        <Footer />
      </div>
    );
  }
}

export default App;
