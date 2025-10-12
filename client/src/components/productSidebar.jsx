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

  // Brand filter - automatically applies when changed
  const handleBrandToggle = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  // Connection filter - automatically applies when changed
  const handleConnectionToggle = (connection) => {
    setFilters((prev) => ({
      ...prev,
      connections: prev.connections.includes(connection)
        ? prev.connections.filter((c) => c !== connection)
        : [...prev.connections, connection],
    }));
  };

  // Category filter - automatically applies when changed
  const handleCategoryChange = (category) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  // Price range - automatically applies when changed
  const handlePriceChange = (index, value) => {
    const newRange = [...filters.priceRange];
    newRange[index] = parseInt(value);

    // Prevent min > max
    if (index === 0 && newRange[0] <= filters.priceRange[1]) {
      setFilters((prev) => ({ ...prev, priceRange: newRange }));
    } else if (index === 1 && newRange[1] >= filters.priceRange[0]) {
      setFilters((prev) => ({ ...prev, priceRange: newRange }));
    }
  };

  // Clear all filters
  const handleClearAll = () => {
    setFilters({
      priceRange: [0, 150000],
      brands: [],
      connections: [],
      category: "All Products",
      buildId: filters.buildId // Preserve buildId if it exists
    });
  };

  // Remove the Apply Filters button since filters are applied automatically
  // The scroll reset will be handled by the parent component

  return (
    <div className="w-80 bg-black border-r border-gray-800 h-screen overflow-y-auto sticky top-0">
      {/* Browse By Section */}
      <div className="p-6 mt-10 border-b border-gray-800">
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
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">₹{filters.priceRange[0].toLocaleString()}</span>
              <span className="text-sm text-white">₹{filters.priceRange[1].toLocaleString()}</span>
            </div>
            
            {/* Min Price Input */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-white opacity-80 min-w-12">Min:</label>
              <input
                type="number"
                min="0"
                max="150000"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(0, e.target.value)}
                className="flex-1 bg-gray-900 border border-gray-700 text-white rounded px-2 py-1 text-sm"
              />
            </div>
            
            {/* Max Price Input */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-white opacity-80 min-w-12">Max:</label>
              <input
                type="number"
                min="0"
                max="150000"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, e.target.value)}
                className="flex-1 bg-gray-900 border border-gray-700 text-white rounded px-2 py-1 text-sm"
              />
            </div>
            
            {/* Range Sliders */}
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="150000"
                step="1000"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(0, e.target.value)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
              />
              <input
                type="range"
                min="0"
                max="150000"
                step="1000"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, e.target.value)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
              />
            </div>
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
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {brands.map((brand, index) => (
                <label key={index} className="flex items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-white opacity-80">{brand}</span>
                </label>
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
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {connectionTypes.map((connection, index) => (
                <label key={index} className="flex items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded">
                  <input
                    type="checkbox"
                    checked={filters.connections.includes(connection)}
                    onChange={() => handleConnectionToggle(connection)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-white opacity-80">{connection}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Clear Filters Button */}
        <div className="mt-8">
          <button
            onClick={handleClearAll}
            className="w-full bg-gray-700 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
}