import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BuildContext } from "../contexts/buildContext";

import { Menu, X } from "lucide-react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(true);
  const { cart } = useContext(BuildContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change background when scrolled more than 10px
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`sticky w-full z-20 top-0 left-0 transition-colors duration-300 ${
      isScrolled ? "bg-gray-900" : "bg-black"
    }`}>
      <div className="flex flex-row justify-between items-center h-[10vh] text-white px-6 mr-5 ml-5 ">
        {/* navlogo */}
        <Link to="/" className="flex flex-row items-center space-x-2">
          <img className="h-[40px]" src={`/images/elevatepc logo 2.png`} alt="logo" />
          <h1 className="text-2xl">ElevatePC</h1>
        </Link>

        {/* nav-center (Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-200 hover:text-blue-500 transition">Home</Link>
          <Link to="/PCBuilderPage" className="text-gray-200 hover:text-blue-500 transition">Build</Link>
          <Link to="/AllProductsPage" className="text-gray-200 hover:text-blue-500 transition">Shop All</Link>
          {/* <Link to="" className="text-gray-200 hover:text-blue-500 transition">About</Link>
          <Link to="" className="text-gray-200 hover:text-blue-500 transition">Contact</Link> */}
          <button
            onClick={() =>
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-gray-200 hover:text-blue-500 transition"
          >
            About
          </button>

          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-gray-200 hover:text-blue-500 transition"
          >
            Contact
          </button>
        </div>

        {/* nav-right */}
        <div className="flex flex-row items-center space-x-6">
          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-200 hover:text-blue-500 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {loggedIn ? (
            <div className="flex flex-row items-center space-x-2">
              {/* Right Cart Icon */}
              <div className="relative mr-5">
                <Link to="/CartPage">
                  <ShoppingCartIcon className="w-8 h-8 hover:text-blue-500 transition" />
                </Link>

                {/* Badge */}
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </div>
              <img className="h-[30px] bg-black" src="/images/login profile icon.png" alt="profile" />
              <h2 className="text-gray-200">Vignesh Pai</h2>
            </div>
          ) : (
            <div className="flex items-center">
              <a href="#" className="text-lg text-gray-200 hover:text-blue-600 transition">Login</a>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden text-white shadow-md transition-colors duration-300 ${
          isScrolled ? "bg-gray-900" : "bg-black"
        }`}>
          <div className="flex flex-col px-6 py-4 space-y-3">
            <a href="#" className="text-gray-200 hover:text-blue-500 transition">Home</a>
            <a href="#" className="text-gray-200 hover:text-blue-500 transition">Build</a>
            <a href="#" className="text-gray-200 hover:text-blue-500 transition">Shop All</a>
            <a href="#" className="text-gray-200 hover:text-blue-500 transition">About</a>
            <a href="#" className="text-gray-200 hover:text-blue-500 transition">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
}