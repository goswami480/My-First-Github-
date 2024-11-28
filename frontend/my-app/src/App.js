import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AddUser from "./look";
import FindUser from "./finduser";
import Navbar from "./navbar";
import Signup from "./signup";
import Login from "./login";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {/* Show Navbar only when authenticated */}
        {isAuthenticated && (
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
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}

        <Routes>
          {/* Public Routes */}
          {!isAuthenticated && (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              {/* Default: Redirect to Signup */}
              <Route path="*" element={<Navigate to="/signup" />} />
            </>
          )}

          {/* Protected Routes */}
          {isAuthenticated && (
            <>
              <Route
                path="/"
                element={
                  <>
                    <section id="add-user">
                      <AddUser />
                    </section>
                    <section id="search">
                      <FindUser />
                    </section>
                    <section id="listing">
                      <Navbar />
                    </section>
                  </>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
