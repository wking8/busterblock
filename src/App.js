import React, { Component } from 'react';
import './App.css';
import AllMovies from './components/AllMovies/AllMovies'
import Footer from './components/Footer/Footer'
import routes from './routes'

class App extends Component {
  render() {
    return (
      <div className="App" >
        <Footer />
        {routes}
      </div>
    );
  }
}

export default App;
