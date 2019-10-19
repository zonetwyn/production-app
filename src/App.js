import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Simulator from './components/Simulator';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <NavBar></NavBar>
        </header>
        <Switch>
          <Route
            exact path="/"
            render={() => <Redirect to="/home" />} />
          <Route
            path="/home" 
            component={Home} />
          <Route
            path="/simulator" 
            component={Simulator} />
          <Route
            component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
