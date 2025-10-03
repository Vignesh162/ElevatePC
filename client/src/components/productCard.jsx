// components/ProductCard.jsx
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const handleView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle add to cart logic here
    navigate(`/Product/${product.id}`);
  }
  const defaultImage = "https://unsplash.com/photos/circuit-board-technology-background-central-computer-processors-cpu-concept-motherboard-digital-chip-tech-science-background-integrated-communication-processor-3d-illustration-kdsISo8KeBkhttps://plus.unsplash.com/premium_photo-1681426698212-53e47fec9a2c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://www.shutterstock.com/image-vector/no-photo-thumbnail-graphic-element-600nw-2311073121.jpg";

  return (
    <Link 
      to={`/Product/${product.id}`}
      className="bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100 h-56">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse bg-gray-300 w-full h-full"></div>
          </div>
        )}
        <img 
          src={imageError ? defaultImage : product.image}
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
          <span className="text-2xl font-bold text-white opacity-80">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {"★".repeat(Math.floor(product.rating))}
            {"☆".repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
        </div>

        {/* View Product Button */}
        <button
          onClick={handleView}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium group-hover:bg-blue-700"
        >
          View Product
        </button>
      </div>
    </Link>
  );
}