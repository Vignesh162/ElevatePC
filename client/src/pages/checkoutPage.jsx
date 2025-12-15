import React, { useContext, useState } from "react";
import { BuildContext } from "../contexts/buildContext";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  const { builds, currentBuildId, cart } = useContext(BuildContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
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

  // Calculate grand total
  const grandTotal = buildTotal + cartTotal;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setOrderSuccess(true);
    }, 2000);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-4xl">✓</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-400 text-lg mb-8">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </Link>
              <Link 
                to="/orders" 
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
              >
                View Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
            Checkout
          </h1>
          <p className="text-gray-400">Complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="Enter your address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="Enter your city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">PIN Code</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="Enter PIN code"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input type="radio" name="payment" className="mr-3" defaultChecked />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input type="radio" name="payment" className="mr-3" />
                  <span>UPI Payment</span>
                </label>
                <label className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input type="radio" name="payment" className="mr-3" />
                  <span>Net Banking</span>
                </label>
                <label className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input type="radio" name="payment" className="mr-3" />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              {/* Build Summary */}
              {currentBuild && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-300 mb-2">PC Build</h3>
                  <div className="space-y-2 text-sm">
                    {currentBuild.components.map(({category, name, price}) => (
                      name && (
                        <div key={category} className="flex justify-between">
                          {/* <span className="text-gray-400 capitalize">{category}:</span> */}
                          <span className="text-gray-400 capitalize">{`${category}: ${name}`}</span>
                          <span>₹{price}</span>
                        </div>
                      )
                    ))}
                  </div>
                  <div className="border-t border-gray-600 mt-2 pt-2 flex justify-between font-semibold">
                    <span>Build Total:</span>
                    <span>₹{buildTotal}</span>
                  </div>
                </div>
              )}

              {/* Cart Items Summary */}
              {cart.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-300 mb-2">Individual Products</h3>
                  <div className="space-y-2 text-sm">
                    {cart.map((item, idx) => (
                      <div key={idx+1} className="flex justify-between">
                        <span className="text-gray-400 truncate max-w-[120px]">{item.name}</span>
                        <span>₹{item.price * (item.quantity || 1)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-600 mt-2 pt-2 flex justify-between font-semibold">
                    <span>Products Total:</span>
                    <span>₹{cartTotal}</span>
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="border-t border-gray-600 pt-4 space-y-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Grand Total:</span>
                  <span className="text-green-400">₹{grandTotal}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing || grandTotal === 0}
                className="w-full mt-6 px-6 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  `Place Order - ₹${grandTotal}`
                )}
              </button>

              {/* Back to Cart */}
              <Link 
                to="/CartPage" 
                className="block text-center mt-4 text-blue-400 hover:text-blue-300 transition-colors"
              >
                ← Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}