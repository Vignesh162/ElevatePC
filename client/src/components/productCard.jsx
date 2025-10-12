// components/ProductCard.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.id}`, {
      state: {
        product,
        from: 'all-products',
        timestamp: new Date().toISOString()
      }
    });
  };

  const handleCardClick = (e) => {
    // If the click is on the button, let handleView handle it
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
      return;
    }
    
    e.preventDefault();
    navigate(`/product/${product.id}`, {
      state: {
        product,
        from: 'all-products',
        timestamp: new Date().toISOString()
      }
    });
  };

  // Fixed default image URL
  const defaultImage = "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  
  // Get first image or default, ensure images array exists
  const productImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : defaultImage;

  // Convert price to number for formatting
  const price = parseFloat(product.price) || 0;
  const originalPrice = product.originalPrice ? parseFloat(product.originalPrice) : null;

  return (
    <div 
      onClick={handleCardClick}
      className="bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100 h-56">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse bg-gray-300 w-full h-full"></div>
          </div>
        )}
        <img 
          src={imageError ? defaultImage : productImage}
          alt={product.name}
          className={`w-full h-56 object-contain transition-all duration-300 ${
            imageLoaded ? 'group-hover:scale-105 opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-white opacity-80">
            ₹{price.toLocaleString('en-IN')}
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {"★".repeat(Math.floor(product.rating || 0))}
            {"☆".repeat(5 - Math.floor(product.rating || 0))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({product.reviews || 0})
          </span>
        </div>

        {/* View Product Button */}
        <button
          onClick={handleView}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium group-hover:bg-blue-700"
        >
          View Product
        </button>
      </div>
    </div>
  );
}