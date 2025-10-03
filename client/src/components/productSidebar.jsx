import { useState } from "react";
export default function ProductSidebar({ filters, setFilters }) {
  const [expandedSections, setExpandedSections] = useState({
    brands: false,
    connectionType: false
  });

  const categories = [
    "All Products",
    "CPU", 
    "GPU",
    "RAM",
    "Storage",
    "PSU",
    "Cooler",
    "Case",
    "Monitor",
    "Gaming Peripherals",
    "Motherboard"
  ];

  const brands = [
    "NVIDIA",
    "AMD", 
    "Intel",
    "ASUS",
    "MSI",
    "Logitech",
    "Razer",
    "Corsair"
  ];

  const connectionTypes = [
    "Wired",
    "Wireless", 
    "Bluetooth",
    "USB-C",
    "USB-A"
  ];

  // Toggle section expand/collapse
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Brand filter
  const handleBrandToggle = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  // Connection filter (extend later if your products have connectionType)
  const handleConnectionToggle = (connection) => {
    setFilters((prev) => ({
      ...prev,
      connections: prev.connections.includes(connection)
        ? prev.connections.filter((c) => c !== connection)
        : [...prev.connections, connection],
    }));
  };

  // Category filter
  const handleCategoryChange = (category) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  // Price range
  const handlePriceChange = (index, value) => {
    const newRange = [...filters.priceRange];
    newRange[index] = parseInt(value);

    // Prevent min > max
    if (newRange[0] <= newRange[1]) {
      setFilters((prev) => ({ ...prev, priceRange: newRange }));
    }
  };

  return (
    <div className="w-80 bg-black border-r border-gray-200 h-screen overflow-y-auto sticky top-0">
      {/* Browse By Section */}
      <div className="p-6 mt-10 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-white mb-4">Browse by</h2>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(category)}
              className={`block w-full text-left py-1 transition-colors ${
                filters.category === category
                  ? "text-blue-500 font-bold"
                  : "text-white opacity-80 hover:text-blue-600 hover:opacity-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Filter By Section */}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Filter by</h2>
        
        {/* Price Range */}
        <div className="mb-6">
          <h3 className="font-medium text-white opacity-80 mb-3">Price</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">₹{filters.priceRange[0].toLocaleString()}</span>
              <span className="text-sm text-white">₹{filters.priceRange[1].toLocaleString()}</span>
            </div>
            {/* Min slider */}
            <input
              type="range"
              min="0"
              max="150000"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceChange(0, e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            {/* Max slider */}
            <input
              type="range"
              min="0"
              max="150000"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Brand Filter - Expandable */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("brands")}
            className="flex items-center justify-between w-full font-medium text-white opacity-80 mb-3 hover:text-blue-600 hover:opacity-100 transition-colors"
          >
            <span>Brand</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                expandedSections.brands ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {expandedSections.brands && (
            <div className="space-y-2">
              {brands.map((brand, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-white opacity-80">{brand}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Connection Type Filter - Expandable */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("connectionType")}
            className="flex items-center justify-between w-full font-medium text-white opacity-80 mb-3 hover:text-blue-600 hover:opacity-100 transition-colors"
          >
            <span>Connection Type</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                expandedSections.connectionType ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {expandedSections.connectionType && (
            <div className="space-y-2">
              {connectionTypes.map((connection, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.connections.includes(connection)}
                    onChange={() => handleConnectionToggle(connection)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-white opacity-80">{connection}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={() => {}}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 hover:opacity-100 transition-colors"
          >
            Apply Filters
          </button>
          <button
            onClick={() =>
              setFilters({
                priceRange: [0, 150000],
                brands: [],
                connections: [],
                category: "All Products",
              })
            }
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
