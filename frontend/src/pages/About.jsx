import React from 'react';
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fffaf5] text-gray-800 font-sans">
      
      {/* About Us Banner */}
      <section className="text-center py-20 bg-[#f5f9f3]">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
      </section>

      {/* Home Sweet Bakery Section */}
      <section className="grid md:grid-cols-2 gap-8 py-16 px-6 md:px-16 items-center">
        <img src="/image/pizza_branch.jpg" alt="Beef Salad" className="rounded-xl shadow-md" />
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-4">Golden Corral</h2>
          <p className="text-gray-600 mb-4">
            Fusce molestie nisl vel rutrum molestie. Aliquam ut justo diam. Duis vel sem sapien. Aenean a blandit dui, nec scelerisque neque.
          </p>
          <h3 className="font-semibold">Opening Hours:</h3>
          <ul className="mb-4">
            <li>Monday - Friday: <span className="text-orange-500">09.00 - 16.00</span></li>
            <li>Saturday - Sunday: <span className="text-orange-500">10.00 - 19.00</span></li>
          </ul>
          <div className="flex gap-4 text-orange-600 text-lg">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>
      </section>

      {/* Freshly Baked Bread Section */}
      <section className="bg-[#fff7ee] py-16 px-6 md:px-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-semibold mb-4">Freshly Baked Bread Every Morning</h2>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices ligula nec lectus accumsan.
          </p>
          <p className="text-gray-600 mb-6">
            Praesent interdum porttitor lacinia. Proin quis pulvinar orci. Quisque lacinia nunc et orci dictum.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition"
          >
            Visit Us
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src="/image/Homemade Tiramisu.jpg" alt="Fresh Bread" />
        </div>
      </section>

      {/* Benefits of Bread Section */}
      <section className="text-center py-16 px-6 md:px-16">
        <h2 className="text-3xl font-semibold mb-4">Benefits Of Breads</h2>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { title: "There’s so much choice", desc: "Vivamus id semper nibh, a tincidunt odio." },
            { title: "Fuel for longer", desc: "Vivamus id semper nibh, a tincidunt." },
            { title: "It tastes great", desc: "Aliquam ut justo diam. Duis vel sem." },
            { title: "Folic acid boost", desc: "Aliquam ut justo diam. Duis vel sem." },
            { title: "Prebiotic properties", desc: "Aliquam lacinia non enim et lobortis." },
            { title: "It’s cost effective", desc: "Praesent maximus pretium egestas." },
          ].map((item, index) => (
            <div key={index} className="bg-[#fffaf0] p-6 rounded-lg shadow">
              <h4 className="font-semibold mb-2">{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}


