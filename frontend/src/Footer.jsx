import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1: Company Mission */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Golden Corral</h3>
          <p className="text-sm leading-relaxed text-gray-300">
            Our job is to filling your tummy with delicious food.
          </p>
        </div>

        {/* Column 2: Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300 text-center">
            <li><a href="/menu" className="hover:underline">Menu</a></li>
            <li><a href="/branches" className="hover:underline">Locations</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow us</h3>
          <div className="flex space-x-6">
    {/* Facebook */}
    <a href="#" className="w-10 h-10 bg-white text-gray-900 flex items-center justify-center rounded-sm hover:bg-gray-300 transition">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.466.099 2.797.143v3.243l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.312h3.59l-.467 3.622h-3.123V24h6.116C23.406 24 24 23.406 24 22.676V1.325C24 .593 23.406 0 22.675 0z"/>
      </svg>
    </a>

    {/* Instagram */}
    <a href="#" className="w-10 h-10 bg-white text-gray-900 flex items-center justify-center rounded-sm hover:bg-gray-300 transition">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
      </svg>
    </a>

    {/* YouTube */}
    <a href="#" className="w-10 h-10 bg-white text-gray-900 flex items-center justify-center rounded-sm hover:bg-gray-300 transition">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
  <path d="M19.615 3.184a2.962 2.962 0 00-2.084-2.084C15.671.5 12 0.5 12 0.5s-3.672 0-5.533.6a2.963 2.963 0 00-2.084 2.084C3.5 5.046 3.5 8.5 3.5 8.5s0 3.453.883 5.316a2.963 2.963 0 002.084 2.084c1.86.6 5.533.6 5.533.6s3.671 0 5.533-.6a2.962 2.962 0 002.084-2.084c.883-1.863.883-5.316.883-5.316s0-3.454-.883-5.316zM10 12.5v-5l4 2.5-4 2.5z" />
    </svg>
    </a>
  </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-12 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Golden Corral. All rights reserved.
      </div>
    </footer>
  );
}
