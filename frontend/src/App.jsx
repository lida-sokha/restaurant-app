import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Navbar from './Navbar'; // Adjust path if your Navbar is in a different folder
import HomePage from './pages/Home'; // Assuming you have a HomePage component
import MenuPage from './pages/Menu';     // IMPORTANT: This is your Menu.jsx component
import TownSquarePage from './pages/TownSquarePage'; // Assuming you have a TownSquarePage component
import RiversidePage from './pages/RiversidePage'; // Assuming you have a RiversidePage component
import Reserve from './pages/Reserve'; // Assuming you have a Reserve component
import Login from './pages/Login';
import Register from './pages/Register'; // Assuming you have a Register component
import AdminDashboard from './pages/AdminDashboard'; // adjust the path if needed
import Footer from './Footer'; // If you have a Footer component

function App() {
  return (
    
    <Router>
      {/* Navbar should be outside <Routes> if it's always visible */}
      <Navbar />

      <main> {/* Wrap your page content, adjust styling as needed */}
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<HomePage />} />
          <Route path="/Menu" element={<MenuPage />} /> {/* Match the path from Navbar */}
          <Route path="/branches/townsquare" element={<TownSquarePage />} />
          <Route path="/branches/riverside" element={<RiversidePage />} />
          <Route path="/Reserve" element={<Reserve />} />
          <Route path='/Login' element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer /> 
    </Router>
  );
}

export default App;