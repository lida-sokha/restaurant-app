import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Navbar from './Navbar'; // Adjust path if your Navbar is in a different folder
import HomePage from './pages/Home'; // Assuming you have a HomePage component
import MenuPage from './pages/Menu';     // IMPORTANT: This is your Menu.jsx component
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
          {/* Add more routes as needed */}
        </Routes>
      </main>
      <Footer /> 
    </Router>
  );
}

export default App;