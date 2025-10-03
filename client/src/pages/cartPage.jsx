import React, { useContext } from "react";
import { BuildContext } from "../contexts/buildContext";

export default function CartPage() {
  const { builds, currentBuildId, cart } = useContext(BuildContext);

  // Find the currently selected build
  const currentBuild = builds.find((b) => b.id === currentBuildId);

  // Calculate build total
  const buildTotal = currentBuild
    ? Object.values(currentBuild.components)
        .filter((c) => c) // remove nulls
        .reduce((sum, comp) => sum + comp.price, 0)
    : 0;

  // Calculate cart total
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {/* Build Section */}
      {currentBuild && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{currentBuild.name}</h2>
          <div className="space-y-3">
            {Object.entries(currentBuild.components).map(([category, component]) => (
              <div
                key={category}
                className="flex justify-between items-center bg-gray-800 p-4 rounded-lg"
              >
                <span className="capitalize font-medium">{category}</span>
                {component ? (
                  <span>
                    {component.name} -{" "}
                    <span className="text-green-400">₹{component.price}</span>
                  </span>
                ) : (
                  <span className="text-gray-500">Not Selected</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 text-right text-lg font-bold">
            Build Total: <span className="text-green-400">₹{buildTotal}</span>
          </div>

          <button className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg">
            Buy This Build
          </button>
        </div>
      )}

      {/* Individual Cart Items */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Individual Products</h2>
        {cart.length > 0 ? (
          <div className="space-y-3">
            {cart.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-gray-800 p-4 rounded-lg"
              >
                <span>{item.name}</span>
                <span className="text-green-400">₹{item.price}</span>
              </div>
            ))}

            <div className="mt-4 text-right text-lg font-bold">
              Cart Total: <span className="text-green-400">₹{cartTotal}</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">No individual products in cart.</p>
        )}

        {cart.length > 0 && (
          <button className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg">
            Buy Cart Products
          </button>
        )}
      </div>
    </div>
  );
}
