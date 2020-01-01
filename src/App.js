import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 

import WelcomePage from './components/welcomepage'; 
import TranslationPage from './components/translationpage';

function App() {
  return (
    <Router>
        <div className='App'>
          <Switch>
            <Route exact path='/' component={WelcomePage}/> 
            <Route exact path='/translate' component={TranslationPage}/> 
          </Switch>
        </div>
    </Router>
  );
}

export default App;
