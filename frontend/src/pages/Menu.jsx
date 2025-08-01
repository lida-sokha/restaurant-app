import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const API_URL = import.meta.env.VITE_API_URL || 'https://menu-app.up.railway.app';

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-24 md:pt-32">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    <p className="text-xl text-gray-700 mt-4">Loading menu...</p>
  </div>
);

const ErrorMessage = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-24 md:pt-32">
    <p className="text-xl text-red-500">Error loading menu: {error}</p>
    <button 
      onClick={onRetry}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      aria-label="Retry loading menu"
    >
      Retry
    </button>
  </div>
);

const MenuItemCard = ({ item }) => {
  // Safely format price (handles strings, numbers, or missing values)
  const formatPrice = (price) => {
    if (price === undefined || price === null) return 'N/A';
    const num = Number(price);
    return isNaN(num) ? 'N/A' : `$${num.toFixed(2)}`;
  };

  return (
    <div className="flex-none w-56 md:w-64 h-80 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105">
      <img
        src={item.image_url || '/images/placeholder.png'}
        alt={item.name}
        className="w-full h-40 object-cover bg-gray-200"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/placeholder.png';
        }}
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h3>
          <p className="text-sm text-gray-600">
            {item.description ? `${item.description.substring(0, 50)}${item.description.length > 50 ? '...' : ''}` : item.category}
          </p>
        </div>
        <p className="text-lg font-bold text-blue-600 mt-2">
          {formatPrice(item.price)}
        </p>
      </div>
    </div>
  );
};

const EmptyMenuState = ({ onRefresh }) => (
  <div className="text-center py-12">
    <img 
      src="/images/empty-menu.svg" 
      alt="Empty menu" 
      className="mx-auto h-40 mb-4"
    />
    <p className="text-xl text-gray-700">Our menu is currently being updated.</p>
    <button 
      onClick={onRefresh}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      aria-label="Refresh menu"
    >
      Refresh Menu
    </button>
  </div>
);

const MenuSection = ({ categoryName, items, renderItem }) => (
  <section className="mb-12">
    <h2 className="text-3xl md:text-4xl font-semibold text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">
      {categoryName}
    </h2>
    <div className="flex overflow-x-auto pb-4 custom-scrollbar">
      <div className="flex flex-nowrap space-x-4 md:space-x-6 pr-4">
        {items.map(renderItem)}
      </div>
    </div>
  </section>
);

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const response = await fetch(`${API_URL}/api/menu`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Validate and normalize menu items
      const validatedItems = Array.isArray(data) ? data : [];
      setMenuItems(validatedItems);
    } catch (err) {
      setError(err.name === 'AbortError' ? 'Request timed out' : err.message || 'Failed to fetch menu items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const groupedMenu = useMemo(() => {
    return menuItems.reduce((acc, item) => {
      const categoryName = item.category || 'Uncategorized';
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(item);
      return acc;
    }, {});
  }, [menuItems]);

  const renderMenuItem = useMemo(
    () => (item) => <MenuItemCard key={item.item_id || item.id || item.name} item={item} />,
    []
  );

  if (loading && showLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={fetchMenuItems} />;

  return (
    <div className="min-h-screen bg-gray-100 py-10 pt-24 md:pt-32">
      <h1 className="text-5xl md:text-6xl font-bold text-center text-blue-800 mb-12">Our Menu</h1>

      <div className="container mx-auto px-4">
        {Object.keys(groupedMenu).length > 0 ? (
          Object.entries(groupedMenu).map(([categoryName, items]) => (
            <MenuSection 
              key={categoryName}
              categoryName={categoryName}
              items={items}
              renderItem={renderMenuItem}
            />
          ))
        ) : (
          <EmptyMenuState onRefresh={fetchMenuItems} />
        )}
      </div>
    </div>
  );
}

// PropTypes
MenuItemCard.propTypes = {
  item: PropTypes.shape({
    item_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    category: PropTypes.string,
    image_url: PropTypes.string
  }).isRequired
};

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired
};

EmptyMenuState.propTypes = {
  onRefresh: PropTypes.func.isRequired
};

MenuSection.propTypes = {
  categoryName: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired
};