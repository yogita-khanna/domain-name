import './App.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Searching from './components/Searching';
import Signup from './components/Signup';
import Login from './components/Login';


function App() {



  
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
        <Route path="/" element={<Login />}/> {/* 👈 Renders at /app/ */}
        <Route path="/data" element={<Home />}/> {/* 👈 Renders at /app/ */}
        <Route path="/csv" element={<Searching />}/> {/* 👈 Renders at /app/ */}
        <Route exact path="/register" element={<Signup />}/> {/* 👈 Renders at /app/ */}
        <Route path="/login" element={<Login />}/> {/* 👈 Renders at /app/ */}
        <Route path="/logout" element={<Login />}/> {/* 👈 Renders at /app/ */}
        
      </Routes>

  </BrowserRouter>
    </div>
  );
}

export default App;
