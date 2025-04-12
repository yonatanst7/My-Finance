
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages and components
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Navbar from './components/Navbar';

function App() {
  const { authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && 
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      }
    </div>
  );
}

export default App
