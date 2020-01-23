import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 

import WelcomePage from './components/welcomepage'; 
import TranslationPage from './components/translationpage';
import Translation from './components/translation'; 

function App() {
  return (
    <div>
      <Router>
          <div className='App'>
            <Switch>
                <Route exact path='/' component={WelcomePage}/> 
                <Route exact path='/translate' component={TranslationPage}/> 
                <Route exact path='/transcription' component={Translation}/>
            </Switch>
          </div>
      </Router>
    </div>
  );
}

export default App;
