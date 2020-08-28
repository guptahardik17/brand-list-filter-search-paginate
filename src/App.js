import React, { Component } from 'react';
import Products from './components/Products/Products.js';
import HomeComponent from './components/Home/HomeComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/:country/products" component={Products}/>
            <Route path="/" component={HomeComponent}/>
          </Switch>
          {/* <Cards /> */}
        </div>
      </Router>
    );
  }
}

export default App;
