// components/Footer.jsx
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">PC Builder</h2>
          <p className="mt-3 text-sm text-gray-400">
            Build your dream PC with ease. Choose parts, compare specs, and get the best deals.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-white transition">
              <FaGithub size={22} />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaLinkedin size={22} />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaTwitter size={22} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-green-500 transition">Home</Link></li>
            <li><Link to="/AllProductsPage" className="hover:text-green-500 transition">Products</Link></li>
            <li><Link to="/PCBuilderPage" className="hover:text-green-500 transition">PC Builder</Link></li>
            <li><Link to="/cart" className="hover:text-green-500 transition">Cart</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            <li><Link to="/AllProductsPage?category=CPU" className="hover:text-green-500">CPU</Link></li>
            <li><Link to="/AllProductsPage?category=GPU" className="hover:text-green-500">GPU</Link></li>
            <li><Link to="/AllProductsPage?category=RAM" className="hover:text-green-500">RAM</Link></li>
            <li><Link to="/AllProductsPage?category=Storage" className="hover:text-green-500">Storage</Link></li>
            <li><Link to="/AllProductsPage?category=Motherboard" className="hover:text-green-500">Motherboard</Link></li>
            <li><Link to="/AllProductsPage?category=PSU" className="hover:text-green-500">PSU</Link></li>
            <li><Link to="/AllProductsPage?category=Cooler" className="hover:text-green-500">Cooler</Link></li>
            <li><Link to="/AllProductsPage?category=Monitor" className="hover:text-green-500">Monitor</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} PC Builder. All rights reserved.
      </div>
    </footer>
  );
}
