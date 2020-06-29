import React from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import axios from 'axios';

import { Main } from './components/Main';

axios.defaults.baseURL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:7000/api/' : '';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
