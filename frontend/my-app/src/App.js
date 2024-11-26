import SignupForm from './look';
import './App.css';
import FindUser from './finduser'
import Navbar from './navbar';


function App() {
  return (
    <div className="App">
     
      <SignupForm/>
      <FindUser/>
      <Navbar/>

    </div>
  );
}

export default App;
