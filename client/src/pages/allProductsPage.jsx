// pages/AllProductsPage.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/productCard";
import ProductSidebar from "../components/productSidebar";
import axios from "axios";

export default function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const backendApiUrl = import.meta.env.BACKEND_API_URL || "http://localhost:4000/api";
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get("category") || "All Products";
  const buildIdFromUrl = queryParams.get("buildId") || null;

  // Master filter state
  const [filters, setFilters] = useState({
    priceRange: [0, 150000],
    brands: [],
    connections: [],
    category: categoryFromUrl,
    buildId: buildIdFromUrl
  });

  // Track if it's the initial load to prevent scroll on first render
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Fetch products
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${backendApiUrl}/products/`);
      const productsData = response.data.products || response.data || [];
      
      if (productsData.length > 0) {
        setProducts(productsData);
        setFilteredProducts(productsData);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Enhanced scroll to top function
  const scrollToTop = () => {
    // Get the header element to account for fixed headers
    const header = document.querySelector('header, [class*="header"], [class*="Header"]');
    const headerHeight = header ? header.offsetHeight : 0;
    
    // Calculate scroll position with offset for header
    const scrollPosition = Math.max(0, headerHeight - 10); // Small buffer
    
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  };

  // Alternative: Scroll to a specific element by ID
  const scrollToElement = (elementId, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      // Fallback to regular scroll to top
      scrollToTop();
    }
  };

  // Run filtering whenever filters or products change
  useEffect(() => {
    if (products.length === 0) return;

    let filtered = [...products];

    // Category filter
    if (filters.category && filters.category !== "All Products") {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter((p) => 
        p.brand && filters.brands.includes(p.brand)
      );
    }

    // Price filter - convert price to number for comparison
    filtered = filtered.filter((p) => {
      const price = parseFloat(p.price) || 0;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Apply sorting to the filtered results
    const sortedProducts = applySorting(filtered, sortBy);
    setFilteredProducts(sortedProducts);

    // Scroll to top when filters change (except on initial load)
    if (products.length > 0 && !isInitialLoad) {
      // Use the enhanced scroll function
      scrollToTop();
      // Alternatively, you can use: scrollToElement('products-header', 80);
    }
    
    // Mark initial load as complete after first filter application
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [filters, products, sortBy]);

  // Separate sorting function
  const applySorting = (productsToSort, sortMethod) => {
    return [...productsToSort].sort((a, b) => {
      const priceA = parseFloat(a.price) || 0;
      const priceB = parseFloat(b.price) || 0;
      const ratingA = parseFloat(a.rating) || 0;
      const ratingB = parseFloat(b.rating) || 0;

      switch (sortMethod) {
        case "price-low":
          return priceA - priceB;
        case "price-high":
          return priceB - priceA;
        case "rating":
          return ratingB - ratingA;
        case "newest":
          return b.id - a.id;
        default:
          return 0; // featured - no sorting
      }
    });
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);
    // Scroll to top when sort changes
    scrollToTop();
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 150000],
      brands: [],
      connections: [],
      category: "All Products",
      buildId: buildIdFromUrl
    });
    setSortBy("featured");
    // Scroll to top when clearing filters
    scrollToTop();
  };

  // Enhanced filter handler that includes scroll reset
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Close mobile filters when a filter is applied
    setShowMobileFilters(false);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <ProductSidebar 
            filters={filters} 
            setFilters={handleFilterChange} 
          />
        </div>

        {/* Mobile Filters Overlay */}
        {showMobileFilters && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="absolute left-0 top-0 h-full w-80 bg-white overflow-y-auto">
              <ProductSidebar 
                filters={filters} 
                setFilters={handleFilterChange} 
              />
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
          {/* Header with title and sort options - Added ID for targeted scrolling */}
          <div id="products-header" className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {filters.category === "All Products" ? "All Products" : filters.category}
              </h1>
              <p className="text-white opacity-80">
                Showing {filteredProducts.length} of {products.length} products
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
              className="w-full bg-black border border-gray-300 rounded-lg px-4 py-3 text-white hover:bg-gray-50 hover:text-black transition-colors flex items-center justify-center"
            >
              <span>📋 Show Filters</span>
            </button>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">⏳</div>
              <h3 className="text-2xl font-semibold text-gray-200 mb-3">
                Loading products...
              </h3>
            </div>
          )}

          {/* Load More / Pagination */}
          {filteredProducts.length > 0 && (
            <div className="flex justify-center mt-12">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Load More Products
              </button>
            </div>
          )}

          {/* Empty State */}
          {products.length > 0 && filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-200 mb-3">
                No products found
              </h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your filters to see more products.
              </p>
              <button
                onClick={clearAllFilters}
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