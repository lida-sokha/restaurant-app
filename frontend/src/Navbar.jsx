import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ['Home', 'Menu', 'Reservation', 'About us'];

  return (
    <nav className="fixed w-full z-20 text-white ">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href='/'>
          <h1 className="text-2xl text-white">Golden Corral</h1>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex space-x-10 text-white text-medium">
            {navLinks.map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="hover:text-blue-500 transition">
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Profile Icon */}
          <a href="/profile" className="ml-4">
            <User className="w-6 h-6 text-white hover:text-blue-500 transition" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-700 hover:text-blue-500 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link}
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
