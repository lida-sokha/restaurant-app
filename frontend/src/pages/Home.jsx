import React from "react";

export default function Home() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <img
        src="/image/Home.jpg"
        alt="Home Background"
        className="object-cover w-full h-full brightness-50"
      />

      {/* Overlayed text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10 text-center px-4">
        <h1 className="font-imperial text-8xl">Welcome to</h1>
        <h2 className="text-5xl sm:text-6xl md:text-7xl drop-shadow-xl">Golden Corral</h2>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl italic drop-shadow-md">
          "Where Every Bite Tells a Story..."
        </p>
      </div>
    </section>
  );
}
