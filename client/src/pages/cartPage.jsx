import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BuildContext } from "../contexts/buildContext";

export default function CartPage() {
  const { builds, currentBuildId, cart } = useContext(BuildContext);
  // Find the currently selected build
  const currentBuild = builds.find((b) => b.id === currentBuildId);

  // Calculate build total
  const buildTotal = currentBuild
    ? Object.values(currentBuild.components)
        .filter((c) => c)
        .reduce((sum, comp) => sum + comp.price * (comp.quantity || 1), 0)
    : 0;

  // Calculate cart total
  const cartTotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  // Product Card Component
  const ProductCard = ({ product, category, type = "build" }) => (
    <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
      <div className="flex items-start gap-4">
        {/* Image Container */}
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center overflow-hidden">
            {product?.images.length>0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="text-gray-500 text-xs text-center p-2">
                <div className="w-6 h-6 mx-auto mb-1">📷</div>
                No Image
              </div>
            )}
          </div>
          {product?.quantity > 1 && (
            <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
              {product.quantity}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
            <div className="min-w-0">
              {category && (
                <span className="inline-block px-2 py-1 bg-gray-700/50 rounded-md text-xs font-medium text-gray-300 capitalize mb-1">
                  {category}
                </span>
              )}
              <h3 className="font-semibold text-white truncate">
                {product?.name || "Not Selected"}
              </h3>
            </div>
            <div className="text-green-400 font-bold text-lg whitespace-nowrap">
              ₹{product ? product.price * (product.quantity || 1) : 0}
            </div>
          </div>

          {product ? (
            <div className="space-y-1">
              <p className="text-gray-400 text-sm line-clamp-2">
                {product.details?.description || "No description available"}
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Qty: {product.quantity || 1}</span>
                {product.price > 0 && (
                  <span>₹{product.price} each</span>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">Component not selected</p>
          )}
        </div>
      </div>
    </div>
  );

  // Action Button Component
  const ActionButton = ({ children, variant = "primary", onClick, disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-8 py-4 rounded-xl font-semibold transition-all duration-300
        transform hover:scale-105 active:scale-95 disabled:opacity-50 
        disabled:cursor-not-allowed disabled:hover:scale-100
        ${
          variant === "primary" 
            ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/25" 
            : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 shadow-lg shadow-green-500/25"
        }
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
             Your Cart
          </h1>
          <p className="text-gray-400">Review and manage your build and products</p>
        </div>

        <div className="space-y-8 lg:space-y-12">
          {/* Build Section */}
          {currentBuild && (
            <section className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {currentBuild.name}
                  </h2>
                  <p className="text-gray-400">Your custom PC build configuration</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 min-w-[200px]">
                  <div className="text-lg font-bold text-right">
                    Build Total: <span className="text-green-400 text-xl">₹{buildTotal}</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 mb-8">
                {Object.entries(currentBuild.components).map(([category, component]) => (
                  <ProductCard
                    key={category}
                    product={component}
                    category={category}
                    type="build"
                  />
                ))}
              </div>

              {/* Build Section Checkout Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Link 
                  to="/CheckoutPage" 
                  className="px-8 py-4 bg-green-600 hover:bg-green-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-center"
                >
                  Checkout Build - ₹{buildTotal}
                </Link>
              </div>
            </section>
          )}

          {/* Individual Cart Items */}
          <section className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Individual Products
                </h2>
                <p className="text-gray-400">Additional components and accessories</p>
              </div>
              {cart.length > 0 && (
                <div className="bg-gray-800/50 rounded-xl p-4 min-w-[200px]">
                  <div className="text-lg font-bold text-right">
                    Cart Total: <span className="text-green-400 text-xl">₹{cartTotal}</span>
                  </div>
                </div>
              )}
            </div>

            {cart.length > 0 ? (
              <>
                <div className="grid gap-4 mb-8">
                  {cart.map((item, idx) => (
                    <ProductCard
                      key={`${item.id || idx}-${item.name}`}
                      product={item}
                      type="cart"
                    />
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <Link 
                    to="/CheckoutPage" 
                    className="px-8 py-4 bg-green-600 hover:bg-green-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-center"
                  >
                    Checkout Products - ₹{cartTotal}
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 text-gray-600">
                  📦
                </div>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  No individual products
                </h3>
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}