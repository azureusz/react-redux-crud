import * as React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import GamesPage from './components/GamesPage';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
            <Link to={'games'}>Games</Link>
        </p>

        <Route path={'/games'} component={GamesPage}/>
      </div>
    );
  }
}

export default App;
