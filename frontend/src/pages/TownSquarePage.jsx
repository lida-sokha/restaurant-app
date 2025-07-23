import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function TownSquarePage() {
  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 40.7128,  // Replace with actual coordinates
    lng: -74.0060  // Replace with actual coordinates
  };

  return (
    <section className="w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">Town Square Branch</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img 
              src="/image/townsquare.jpg" 
              alt="Town Square Branch"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Location Details</h2>
            <p className="text-lg">123 Main Street, City Center</p>
            <p className="text-lg">Mon-Sun: 10AM - 10PM</p>
            <p className="text-gray-700">Our flagship location in the heart of the city.</p>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
              <p>Phone: (123) 456-7890</p>
              <p>Email: townsquare@goldencorral.com</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Find Us</h2>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </section>
  );
}