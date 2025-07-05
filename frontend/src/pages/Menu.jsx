import React, { useState, useEffect } from 'react';

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Replace with your actual backend API URL
        const response = await fetch('http://localhost:5000/api/menu'); // Example: Your backend might be on port 5000
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []); // Empty dependency array means this runs once on component mount

  // Function to group items by category
  const groupByCategory = (items) => {
    return items.reduce((acc, item) => {
      // Ensure category is a string and not null/undefined
      const categoryName = item.category || 'Uncategorized';
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(item);
      return acc;
    }, {});
  };

  const groupedMenu = groupByCategory(menuItems);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-24 md:pt-32">
        <p className="text-xl text-gray-700">Loading menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-24 md:pt-32">
        <p className="text-xl text-red-500">Error loading menu: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 pt-24 md:pt-32"> {/* Added pt-24/pt-32 for Navbar */}
      <h1 className="text-5xl md:text-6xl font-bold text-center text-blue-800 mb-12">Our Menu</h1>

      <div className="container mx-auto px-4"> {/* Use a container for overall max-width */}
        {Object.keys(groupedMenu).length > 0 ? (
          Object.keys(groupedMenu).map((categoryName) => (
            <section key={categoryName} className="mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">
                {categoryName}
              </h2>

              {/* Horizontal Scrolling Container */}
              <div className="flex overflow-x-auto pb-4 custom-scrollbar"> {/* 'pb-4' for scrollbar space */}
                <div className="flex flex-nowrap space-x-6 pr-4"> {/* 'space-x-6' for gap between items, 'pr-4' to see last item */}
                  {groupedMenu[categoryName].map((item) => (
                    <div key={item.item_id} className="flex-none w-64 h-80 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105">
                      {/* Item Image */}
                      <img
                        src={item.image_url || '/image/placeholder.png'} // Use actual image_url, fallback to placeholder
                        alt={item.name}
                        className="w-full h-40 object-cover bg-gray-200" // Added bg-gray-200 for black boxes in image
                      />
                      <div className="p-4 flex flex-col justify-between flex-grow">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h3>
                          {/* Display description if available, or a generic category if needed */}
                          <p className="text-sm text-gray-600">{item.description ? item.description.substring(0, 50) + '...' : item.category}</p>
                        </div>
                        <p className="text-lg font-bold text-blue-600 mt-2">${parseFloat(item.price).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))
        ) : (
          <p className="text-center text-xl text-gray-700">No menu items available.</p>
        )}
      </div>

      <p className="mt-12 text-center text-sm text-gray-500">
        For more details, please contact us.
      </p>

    </div>
  );
}