import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Reservation', path: '/Reserve' },
    { name: 'About us', path: '/About' },
  ];

  // --- Dynamic Background Color ---
  let navbarBgClass = '';
  if (location.pathname === '/') {
    navbarBgClass = 'bg-transparent'; // Clear background for Home page
  } else if (location.pathname === '/menu' ) {
    navbarBgClass = 'text-white'; // Blue background for Menu page
  }
   else {
    navbarBgClass = 'bg-gray-800'; // Gray background for all other pages
  }

  // --- Dynamic Text Color ---
  let navLinkTextColorClass = '';
  if (location.pathname === '/') {
    navLinkTextColorClass = 'text-white'; // White text for Home page
  } else if (location.pathname === '/menu') {
    navLinkTextColorClass = 'text-blue-900'; // Blue text for Menu page
  } else {
    navLinkTextColorClass = 'text-white'; // White text for all other pages
  }

  return (
    <nav className={`fixed w-full z-20 ${navbarBgClass}`}> {/* Apply background color here */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo - its color will also change based on navLinkTextColorClass */}
        <a href='/'>
          {/* Apply text color class to the logo */}
          <h1 className={`text-2xl ${navLinkTextColorClass}`}>Golden Corral</h1>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {/* Apply text color class to the ul for all desktop links */}
          <ul className={`flex space-x-10 text-medium ${navLinkTextColorClass}`}>
            {navLinks.map((link) => (
              <li key={link.name}>
                {/* Individual links can also have hover effects */}
                {/* The 'hover:text-blue-500 transition' will still work on top of the base color */}
                <a href={link.path} className="hover:text-blue-500 transition">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Profile Icon - its color will also change */}
          <a href="/Login" className="ml-4">
            <User className={`w-6 h-6 hover:text-blue-500 transition ${navLinkTextColorClass}`} />
          </a>
        </div>

        {/* Mobile Menu Button - its color will also change */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {/* Apply text color class to the mobile menu icon */}
            {isOpen ? <X className={`w-6 h-6 ${navLinkTextColorClass}`} /> : <Menu className={`w-6 h-6 ${navLinkTextColorClass}`} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (internal links are already gray-700, so you might not need to change them) */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.path}
                  className="text-gray-700 hover:text-blue-500 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}

            {/* Mobile Profile Icon */}
            <li>
              <a
                href="/profile"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-500 font-medium"
                onClick={() => setIsOpen(false)}
              >
                <span>Profile</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;