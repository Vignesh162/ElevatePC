// pages/AllProductsPage.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/productCard";
import ProductSidebar from "../components/productSidebar";
import axios from "axios";

const LIMIT = 20;

export default function AllProductsPage() {
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:4000/api";
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get("category") || "All Products";
  const buildIdFromUrl = queryParams.get("buildId") || null;
  const [isIntialLoad, setIsInitialLoad] = useState(true);
  const loaderRef = useRef(null);
  const offsetRef = useRef(0);
  const isFetchingRef = useRef(false);
  const getProductsRef = useRef(null);

  const [filters, setFilters] = useState({
    priceRange: [0, 150000],
    brands: [],
    connections: [],
    category: categoryFromUrl,
    buildId: buildIdFromUrl,
  });

  const getProducts = async (reset = false) => {
    if (isFetchingRef.current || (!hasMore && !reset)) return;

    try {
      isFetchingRef.current = true;
      setLoading(true);

      const currentOffset = reset ? 0 : offsetRef.current;

      const response = await axios.get(`${backendApiUrl}/products`, {
        params: {
          limit: LIMIT,
          offset: currentOffset,
          category: filters.category !== "All Products" ? filters.category : undefined,
        },
      });

      const { products: newProducts, meta } = response.data;

      setProducts((prev) => {
        if (reset) return newProducts;
        const existingIds = new Set(prev.map((p) => p.id));
        const uniqueNewProducts = newProducts.filter((p) => !existingIds.has(p.id));
        return [...prev, ...uniqueNewProducts];
      });

      offsetRef.current = reset ? LIMIT : offsetRef.current + LIMIT;
      setHasMore(meta.hasMore);
      setIsInitialLoad(false);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  };

  // Keep ref always pointing to latest getProducts
  getProductsRef.current = getProducts;

  // When filters/sort change, reset and refetch
  useEffect(() => {
    setHasMore(true);
    offsetRef.current = 0;
    getProductsRef.current(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters.category, filters.brands, filters.priceRange[0], filters.priceRange[1], sortBy]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          getProductsRef.current();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, loading]);

  const handleSortChange = (e) => setSortBy(e.target.value);

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 150000],
      brands: [],
      connections: [],
      category: "All Products",
      buildId: buildIdFromUrl,
    });
    setSortBy("featured");
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setShowMobileFilters(false);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <ProductSidebar filters={filters} setFilters={handleFilterChange} />
        </div>

        {/* Mobile Filters Overlay */}
        {showMobileFilters && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="absolute left-0 top-0 h-full w-80 bg-white overflow-y-auto">
              <ProductSidebar filters={filters} setFilters={handleFilterChange} />
              <button
                aria-label="Close filters"
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
          {/* Header */}
          <div id="products-header" className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {filters.category === "All Products" ? "All Products" : filters.category}
              </h1>
              <p className="text-white opacity-80">
                Showing {products.length} products
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
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : 
          (
            loading && (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">⏳</div>
                <h3 className="text-2xl font-semibold text-gray-200 mb-3">
                  Loading products...
                </h3>
              </div>
            )
          )}

          {/* Infinite scroll trigger */}
          {hasMore && !isIntialLoad && (
            <div ref={loaderRef} className="flex justify-center mt-12 py-10">
              {loading && (
                <div className="text-gray-400 text-lg animate-pulse">
                  Loading more products...
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {products.length === 0 && !loading && (
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