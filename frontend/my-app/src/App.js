import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
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
        {/* Navbar with links to sections using # */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#add-user">
                    Add User
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#search">
                    Search
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#listing">
                    Listing
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Page sections rendered on the same page with anchor tags */}
        <section id="add-user">
          <AddUser />
        </section>

        <section id="search">
          <FindUser />
        </section>

        <section id="listing">
          <Navbar />
        </section>
      </div>
    </Router>
  );
}

export default App;
