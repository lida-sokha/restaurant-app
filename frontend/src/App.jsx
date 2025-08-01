import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Shared components
import Navbar from './Navbar';
import Footer from './Footer';

// Public pages
import HomePage from './pages/Home';
import MenuPage from './pages/Menu';
import TownSquarePage from './pages/TownSquarePage';
import RiversidePage from './pages/RiversidePage';
import Reserve from './pages/Reserve';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';

// Admin pages
import AdminDashboard from './pages/AdminDashboard';
import SelectTable from './pages/SelectTable';
import AdminMenu from './pages/AdminMenu';
import Cart from './pages/Cart';
import OrderSuccess from './pages/Order-success'; 
import AdminReservations from './pages/AdminReservations';
function App() {
  return (
    <Router>
      <Navbar />

      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/Menu" element={<MenuPage />} />
          <Route path="/branches/townsquare" element={<TownSquarePage />} />
          <Route path="/branches/riverside" element={<RiversidePage />} />
          <Route path="/Reserve" element={<Reserve />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/About" element={<About />} />

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/select-table" element={<SelectTable />} />
          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route path="/admin/cart" element={<Cart />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/admin/reservations" element={<AdminReservations />} />

          {/* Catch-all route */}
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
