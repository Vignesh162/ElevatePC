import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BuildContext } from "../contexts/buildContext";
import { AuthContext } from "../contexts/authContext";
import { Menu, X } from "lucide-react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  // const [loggedIn, setLoggedIn] = useState(true);
  const { user, token, logout} = useContext(AuthContext);
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
  const navigate = useNavigate();
  const handleNavigateAndScroll = (sectionId) => {
    navigate("/", { state: { scrollTo: sectionId } });
  };
  
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
          { user?.role === "admin" ?<Link to="/Admin/Dashboard" className="text-gray-200 hover:text-blue-500 transition">Admin Dashboard</Link>:""}
          {/* <Link to="" className="text-gray-200 hover:text-blue-500 transition">About</Link>
          <Link to="" className="text-gray-200 hover:text-blue-500 transition">Contact</Link> */}
          <button
            onClick={() => handleNavigateAndScroll("about")}
            className="text-gray-200 hover:text-blue-500 transition"
          >
            About
          </button>

          <button
            onClick={() => handleNavigateAndScroll("contact")}
            className="text-gray-200 hover:text-blue-500 transition"
          >
            Contact Us
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

          {user ? (
            <div className="flex flex-row items-center space-x-3">
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
              <h2 className="text-gray-200">{user?.name || "xyz"}</h2>
              <button  onClick={logout} className="w-18 h-9 ml-2 rounded-xl bg-red-500">Logout</button>
            </div>
          ) : (
            <div className="flex items-center">
              <Link to="/LoginPage" className="text-lg text-gray-200 hover:text-blue-600 transition">
                <button class="w-20 h-10 ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded-xl">Login</button>
              </Link>
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