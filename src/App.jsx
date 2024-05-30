import React from 'react';
import './assetss/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TableHero from './components/TableHero';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" exact render ={props=> (<TableHero{...props} />)}></Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default App;
