import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddUser from './look'; 
import FindUser from './finduser';
import Navbar from './navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      
      <div className="App">
    
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
           
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Add User</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/search">Search</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/listing">Listing</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<AddUser />} />
          <Route path="/search" element={<FindUser />} />
          <Route path="/listing" element={<Navbar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
