import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import RumorsDisplay from './RumorsDisplay';

const App = props => (
  <Router>
    <div>
      <Route
        path="/"
        component={RumorsDisplay}
      />
    </div>
  </Router>
);

export default App;
