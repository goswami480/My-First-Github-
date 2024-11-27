import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignupForm from './look';
import './App.css';
import FindUser from './finduser';
import Navbar from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // For functionality like dropdowns and modals


function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
           <img src=""/>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/add-user">ADD USER</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/search">SEARCH</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/listing">LISTING</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Define routes for different components */}
        <Routes>
          <Route path="/add-user" element={<SignupForm />} />
          <Route path="/search" element={<FindUser />} />
          <Route path="/listing" element={<Navbar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
