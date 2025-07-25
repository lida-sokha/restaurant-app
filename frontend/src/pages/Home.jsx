import React from "react";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();
  return (
    <section className="w-full overflow-hidden">
      {/* Hero Section with Background Image */}
      <div className="relative h-screen w-full">
        <img
          src="/image/Home.jpg"
          alt="Home Background"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />

        {/* Centered Overlay Text */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="font-imperial text-8xl">Welcome to</h1>
          <h2 className="text-5xl sm:text-6xl md:text-7xl drop-shadow-xl">
            Golden Corral
          </h2>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl italic drop-shadow-md">
            "Where Every Bite Tells a Story..."
          </p>
        </div>
      </div>

      {/* Blue Text Section */}
      <div className="bg-white text-center py-16 px-4">
        <h3 className="text-3xl sm:text-4xl md:text-5xl text-blue-900 leading-snug max-w-5xl mx-auto">
          "For a happier future, we choose compassion. Our zero-waste path is just beginning."
        </h3>
        <p className="mt-6 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          Join us on our zero-waste journey. We believe true happiness blossoms when we nurture our planet and future generations.
        </p>
      </div>
      {/* Location and Menu Section */}
<div className="flex flex-wrap w-full">
  {/* Location Box */}
  <div className="bg-orange-400 text-white w-full md:w-1/2 p-6">
    <h3 className="text-3xl mb-4 text-center font-semibold">Location</h3>

    {/* Branch Image */}
    {/* Branch Selector */}
        <div className="mb-4">
  <label htmlFor="branch" className="block text-lg font-semibold mb-2">
    Select Branch:
  </label>
  <select
    id="branch"
    name="branch"
    className="w-full p-2 rounded text-black"
    onChange={(e) => {
      const selected = e.target.value;
      if (selected) {
       navigate(`/branches/${selected}`); // Adjust the path as needed
        // or use: navigate(`/branches/${selected}`) if using React Router
      }
    }}
  >
    <option value="">Choose a branch </option>
    <option value="townsquare">Town Square</option>
    <option value="riverside">Riverside</option>
  </select>
</div>

    <img src="/image/pizza_branch.jpg" alt="Branch" className="w-200 h-50 object-cover mb-4 rounded-md mt-10" />
      </div>


        {/* Menu Box */}
        <div className="bg-orange-100 text-center p-6 w-full md:w-1/2 relative">
          <h3 className="text-3xl font-semibold text-blue-900 mb-4">Menu</h3>

          <div className="relative inline-block">
            {/* Menu Image */}
            <img
              src="/image/menu.png" // change this to your image path
              alt="Menu"
              className=" object-cover rounded-md mt-10"
            />

            {/* Circle Button Overlay */}
            <a
              href="/menu"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black font-medium rounded-full w-32 h-32 flex items-center justify-center text-lg shadow-lg hover:scale-105 transition"
            >
              View Menu
            </a>
          </div>
        </div>

      </div>
      <section className="relative w-full h-[500px] mt-2">
        {/* Background image */}
        <img
          src="/image/sustainability.jpg" // replace with your image path
          alt="Sustainability"
          className="w-full h-full object-cover"
        />

        {/* Overlayed Text */}
       <div className="absolute top-0 left-0 w-full h-full flex flex-col pt-10 px-8 md:px-16 text-white ">
          <h1 className="text-8xl sm:text-8xl md:text-6xl font-serif leading-tight">
            Sustainability<br />Refreshing
          </h1>
        </div>

        {/* Bottom Right Paragraph */}
        <div className="absolute bottom-8 right-8 w-[300px] text-right text-blue-900 text-3xl font-medium ">
          Our commitment to a<br />
          healthier planet, one<br />
          sip at a time.
        </div>
      </section>


    </section>
  );
}
