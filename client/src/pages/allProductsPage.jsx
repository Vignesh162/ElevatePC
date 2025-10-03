// pages/AllProductsPage.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/productCard";
import ProductSidebar from "../components/productSidebar";

// Mock data - replace with actual API data
import productsData from "../components/productsData";

export default function AllProductsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get("category") || "All Products";
  const buildIdFromUrl = queryParams.get("buildId") || null;

  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [sortBy, setSortBy] = useState("featured");

  // Master filter state
  const [filters, setFilters] = useState({
    priceRange: [0, 150000],
    brands: [],
    connections: [],
    category: categoryFromUrl,
     buildId: buildIdFromUrl
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Run filtering whenever filters change
  useEffect(() => {
    let filtered = productsData;

    // Category filter
    if (filters.category !== "All Products") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter((p) => filters.brands.includes(p.brand));
    }

    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // TODO: extend with connection filter later

    setFilteredProducts(filtered);
  }, [filters]);

  // Sorting
  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      switch (sortValue) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <ProductSidebar filters={filters} setFilters={setFilters} />
        </div>

        {/* Mobile Filters Overlay */}
        {showMobileFilters && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="absolute left-0 top-0 h-full w-80 bg-white overflow-y-auto">
              <ProductSidebar filters={filters} setFilters={setFilters} />
              <button
                onClick={() => setShowMobileFilters(false)}
                className="absolute top-4 right-4 text-black hover:text-blue-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header with title and sort options */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">All Products</h1>
              <p className="text-white opacity-80">
                Showing {filteredProducts.length} products
              </p>
            </div>

            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <span className="text-white opacity-80">Sort by:</span>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="border border-gray-900 bg-black text-white opacity-80 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Mobile filter button */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="w-full bg-black border border-gray-300 rounded-lg px-4 py-3 text-white hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <span>📋 Show Filters</span>
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More / Pagination */}
          {filteredProducts.length > 0 && (
            <div className="flex justify-center mt-12">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Load More Products
              </button>
            </div>
          )}

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-200 mb-3">
                No products found
              </h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your filters to see more products.
              </p>
              <button
                onClick={() => {
                  setFilteredProducts(productsData);
                  setFilters({
                    priceRange: [0, 150000],
                    brands: [],
                    connections: [],
                    category: "All Products",
                  });
                  setSortBy("featured");
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
