import React from 'react';
import './assetss/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" exact render ={props=> (<Login{...props} />)}></Route>
          <Route path="/dashboard" exact render ={props=> (<Dashboard{...props} />)}></Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
