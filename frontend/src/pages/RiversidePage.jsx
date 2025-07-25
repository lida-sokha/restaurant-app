import React from 'react';

export default function RiversidePage() {
  return (
    <section className="w-full pt-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-semibold text-center text-blue-900 mb-12">Location</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side: Image */}
          <img
            src="/image/Riverside.jpg"
            alt="Restaurant Exterior"
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />

          {/* Right side: Reservation box */}
          <div className="flex flex-col items-center justify-center text-center space-y-4 ">
            <p className="text-3xl text-gray-800 font-medium">Reservation</p>
            <p className="text-blue-800 text-xl font-semibold">(+855) 56 888 999</p>
            <a href='/Reserve' className="w-full">
            <button className="bg-blue-800 text-white px-6 py-3 rounded-full hover:bg-blue-900 transition">
              Book A Table
            </button>
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Left side: Address */}
          <div>
            <h3 className="text-3xl font-semibold text-blue-800 mb-2">Access</h3>
            <p className="text-gray-700 text-2xl">
             F02-01 Street 1 Presh, 12300, Preah Sisowath Quay,<br />
             Phnom Penh, Cambodia<br />
              Preah Sisowath Quay, Phnom Penh, Cambodia
            </p>
          </div>

          {/* Right side: Map */}
          <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.013925713868!2d104.92226531536338!3d11.548875491804977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951add5e2cd81%3A0x171e0b69c7c6f7ba!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1620000000000!5m2!1sen!2skh"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
              aria-label="Google Map of restaurant location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}