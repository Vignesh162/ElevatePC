// pages/ProductDescriptionPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BuildContext } from "../contexts/buildContext";
import { AuthContext } from "../contexts/authContext";
import { useLocation } from 'react-router-dom';

//import productsData from "../components/productsData";

export default function ProductDescriptionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addProduct, currentBuildId, addProductToCart } = useContext(BuildContext);
  const {user} = useContext(AuthContext);
  const {product} = location.state || {};
  //console.log(product);
  //const product = productsData.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="p-6 text-white">Product not found</div>;
  }

  const handleAdd = () => {
    let category = product.category.toLowerCase();
    if (category.includes("cpu")) category = "cpu";
    if (category.includes("gpu") || category.includes("graphics")) category = "gpu";
    if (category.includes("monitor")) category = "monitor";
    if (category.includes("storage")) category = "storage";
    if (category.includes("motherboard")) category = "motherboard";
    if (category.includes("ram")) category = "ram";
    if (category.includes("psu")) category = "psu";
    if (category.includes("case")) category = "case";
    if (category.includes("cooler")) category = "cooler";

    addProduct(category, product);

    if (currentBuildId) {
      if(!user){
        navigate("/LoginPage");
        return;
      }
      navigate("/PCBuilderPage");
    } else {
      navigate("/cart");
    }
  };
  const handleAddToCart = () => {
    if(!user){ 
      navigate("/LoginPage");
      return;
    }
      addProductToCart(product);
    alert("Product Added To Cart Successfully")
  };

  return (
    <div className="min-h-[90vh] bg-gray-950 text-white p-6">
      {/* <button
        className="mb-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded flex items-center gap-2 transition"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button> */}

      <div className="flex flex-col lg:flex-row gap-8 bg-gray-900 rounded-2xl p-6 shadow-lg shadow-black/50">
        {/* Product Image */}
        <div className="flex justify-center lg:w-1/3">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-72 h-72 lg:w-90 lg:h-90 object-contain rounded-xl shadow-md shadow-black/40"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold">{product.name}</h1>
            <p className="text-2xl font-bold text-green-500">₹{product.price}</p>
            <div className="text-gray-400 space-y-1">
              <p>
                <span className="font-semibold text-gray-200">Category:</span>{" "}
                {product.category}
              </p>
              <p>
                <span className="font-semibold text-gray-200">Brand:</span>{" "}
                {product.brand}
              </p>
              <p>
                <span className="font-semibold text-gray-200">Rating:</span>{" "}
                {product.rating} ({product.reviews} reviews)
              </p>
            </div>
          </div>

          {/* Specifications Section */}
          {product.details && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2 text-green-400">Specifications</h2>
              <ul className="space-y-2 text-gray-300">
                {Object.entries(product.details).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-semibold text-gray-200 capitalize">
                      {key}:
                    </span>{" "}
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-row justify-around gap-6">
            <button
            className="mt-6 w-full lg:w-full px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-bold transition transform hover:scale-105"
            onClick={handleAdd}
          >
            Add to Build
          </button>
          <button
            className="mt-6 w-full lg:w-full px-6 py-3 bg-blue-500 hover:bg-blue-700 rounded-xl font-bold transition transform hover:scale-105"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
