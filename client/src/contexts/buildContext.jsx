// contexts/BuildContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";

export const BuildContext = createContext();

export const BuildProvider = ({ children }) => {
  const { token, user } = useContext(AuthContext);
  const [builds, setBuilds] = useState([]);
  const [currentBuildId, setCurrentBuildId] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:4000/api";

  // Helper function to get axios config with auth header
  const getAuthConfig = () => {
    const authToken = token || localStorage.getItem('token');
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    };
  };
  const normalizeBuild = (build) => {
    if (!build.components) return build;

    const normalizedComponents = {};

    // components can be array OR object → handle both
    if (Array.isArray(build.components)) {
        build.components.forEach((comp) => {
        normalizedComponents[comp.category] = {
            ...comp,
            product_id: comp.product_id ?? comp.id
        };
        delete normalizedComponents[comp.category].id;
        });
    } else {
        Object.entries(build.components).forEach(([category, comp]) => {
        normalizedComponents[category] = {
            ...comp,
            product_id: comp.product_id ?? comp.id
        };
        delete normalizedComponents[category].id;
        });
    }

    return {
        ...build,
        components: normalizedComponents
    };
    };


  // Load builds from API when token is available
  useEffect(() => {
    if (token) {
      fetchUserBuilds();
      fetchCart();
    }
  }, [token]);

  // Fetch user builds from API
  const fetchUserBuilds = async () => {
    if (!token) {
      setError("Authentication required");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${backendApiUrl}/builds/me`, getAuthConfig());
      const buildsData = response.data;
      if (buildsData && buildsData.length > 0) {
        const normalizedBuilds = buildsData.map(normalizeBuild);
        setBuilds(normalizedBuilds);
        setCurrentBuildId(normalizedBuilds[0].id);
      } else {
        // Create a default build if user has none
        await createBuild({
          name: "My First Build",
          status: "draft",
          components: {}
        });
      }
    } catch (err) {
      console.error("Error fetching builds:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else {
        setError("Failed to load builds. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart from API
  const fetchCart = async () => {
    if (!token) {
      setCart([]);
      return;
    }

    try {
      const response = await axios.get(`${backendApiUrl}/cart`, getAuthConfig());
      setCart(response.data.cart || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart([]);
    }
  };

  // Create new build via API
  const createBuild = async (buildData) => {
    if (!token) {
      throw new Error("Authentication required");
    }

    try {
      setLoading(true);
      const response = await axios.post(`${backendApiUrl}/builds`, buildData, getAuthConfig());
      const newBuild = response.data;
      
      setBuilds(prev => [...prev, newBuild]);
      setCurrentBuildId(newBuild.id);
      return newBuild;
    } catch (err) {
      console.error("Error creating build:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else {
        setError("Failed to create build");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Add new build (wrapper for createBuild)
  const addNewBuild = async () => {
    if (!token) {
      throw new Error("Please login to create a build");
    }

    const newBuild = {
      name: `Build ${builds.length + 1}`,
      status: "draft",
      components: []
    };
    
    return await createBuild(newBuild);
  };

  // Update build name via API
  const updateBuildName = async (buildId, name) => {
    if (!token) {
      throw new Error("Authentication required");
    }

    try {
      await axios.patch(`${backendApiUrl}/builds/${buildId}`, { name }, getAuthConfig());
      setBuilds(prev => prev.map(b => b.id === buildId ? { ...b, name } : b));
    } catch (err) {
      console.error("Error updating build name:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else {
        setError("Failed to update build name");
      }
      throw err;
    }
  };
  // todo 
  // Update build status via API
  const updateBuildStatus = async (buildId, status) => {
    if (!token) {
      throw new Error("Authentication required");
    }

    try {
      await axios.patch(`${backendApiUrl}/builds/${buildId}`, { status }, getAuthConfig());
      setBuilds(prev => prev.map(b => b.id === buildId ? { ...b, status } : b));
    } catch (err) {
      console.error("Error updating build status:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else {
        setError("Failed to update build status");
      }
      throw err;
    }
  };
  // todo
  // Add product to build via API
  const addProductToBuild = async (buildId, product, category) => {
    if (!token) {
      throw new Error("Authentication required");
    }

    try {
      // Get current build
      const currentBuild = builds.find(b => b.id === buildId);
      if (!currentBuild) throw new Error("Build not found");

      // Update components array - remove existing component of same category
      const updatedComponents = currentBuild.components
        ? Object.values(currentBuild.components).filter(comp => comp.category !== category)
        : [];
      // Add new component
      updatedComponents.push({
        product_id: product.id,
        category: category,
        name: product.name,
        price: product.price,
        images: product.images,
        brand: product.brand
      });
      // Update via API
      const response = await axios.put(
        `${backendApiUrl}/builds/${buildId}`, 
        { components: updatedComponents }, 
        getAuthConfig()
      );
      console.log(response);
      // Update local state
      setBuilds(prev => prev.map(b => 
        b.id === buildId 
          ? { ...b, components: updatedComponents, compatibility:response.data.compatibility }
          : b
      ));

      return response.data;
    } catch (err) {
      console.error("Error adding product to build:", err);
      console.error("Error details:", err.response?.data);
      if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else {
        setError("Failed to add product to build");
      }
      throw err;
    }
  };
//   const removeProductFromBuild = async (buildId, product, category) => {
//     if (!token) {
//       throw new Error("Authentication required");
//     }

//     try {
//       // Get current build
//       const currentBuild = builds.find(b => b.id === buildId);
//       if (!currentBuild) throw new Error("Build not found");

//       // Update components array - remove existing component of same category
//       const updatedComponents = currentBuild.components
//         ? Object.values(currentBuild.components).filter(comp => comp.category !== category)
//         : [];
//       // Update via API
//       const response = await axios.put(
//         `${backendApiUrl}/builds/${buildId}`, 
//         { components: updatedComponents }, 
//         getAuthConfig()
//       );
//       console.log(response);
//       // Update local state
//       setBuilds(prev => prev.map(b => 
//         b.id === buildId 
//           ? { ...b, components: updatedComponents, compatibility:response.data.compatibility }
//           : b
//       ));

//       return response.data;
//     } catch (err) {
//       console.error("Error removing product from build:", err);
//       console.error("Error details:", err.response?.data);
//       if (err.response?.status === 401) {
//         setError("Authentication failed. Please login again.");
//       } else {
//         setError("Failed to remove product from build");
//       }
//       throw err;
//     }
//   };

  // Add product to cart via API
  const addProductToCart = async (product, quantity = 1) => {
    if (!token) {
      throw new Error("Please login to add to cart");
    }

    try {
      await axios.post(
        `${backendApiUrl}/cart`, 
        {
          product_id: product.id,
          quantity: quantity
        }, 
        getAuthConfig()
      );

      // Update local state
      setCart(prev => {
        const existingItem = prev.find(item => item.product_id === product.id);
        if (existingItem) {
          return prev.map(item =>
            item.product_id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prev, {
            product_id: product.id,
            quantity: quantity,
            name: product.name,
            price: product.price,
            images: product.images,
            brand: product.brand,
            category: product.category
          }];
        }
      });
    } catch (err) {
      console.error("Error adding product to cart:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else {
        setError("Failed to add product to cart");
      }
      throw err;
    }
  };

  // Update cart quantity via API
  const updateCartQuantity = async (productId, quantity) => {
    if (!token) {
      throw new Error("Authentication required");
    }

    try {
      // Get current cart and update the specific item
      const updatedCart = cart.map(item =>
        item.product_id === productId
          ? { ...item, quantity }
          : item
      );

      // Send bulk update to API
      const cartItems = updatedCart.map(({ product_id, quantity }) => ({
        product_id,
        quantity
      }));

      await axios.put(
        `${backendApiUrl}/cart`, 
        { cartItems }, 
        getAuthConfig()
      );
      setCart(updatedCart);
    } catch (err) {
      console.error("Error updating cart:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else {
        setError("Failed to update cart");
      }
      throw err;
    }
  };

  // Remove product from cart via API
  const removeFromCart = async (productId) => {
    if (!token) {
      throw new Error("Authentication required");
    }

    try {
      await axios.delete(
        `${backendApiUrl}/cart/${productId}`, 
        getAuthConfig()
      );
      setCart(prev => prev.filter(item => item.product_id !== productId));
    } catch (err) {
      console.error("Error removing from cart:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else {
        setError("Failed to remove from cart");
      }
      throw err;
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!token) {
      throw new Error("Authentication required");
    }

    try {
      // Remove each item individually
      const deletePromises = cart.map(item => 
        axios.delete(`${backendApiUrl}/cart/${item.product_id}`, getAuthConfig())
      );
      await Promise.all(deletePromises);
      setCart([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else {
        setError("Failed to clear cart");
      }
      throw err;
    }
  };

  // Delete build via API
  const deleteBuild = async (buildId) => {
    if (!token) {
      throw new Error("Authentication required");
    }

    try {
      await axios.delete(
        `${backendApiUrl}/builds/${buildId}`, 
        getAuthConfig()
      );
      
      setBuilds(prev => {
        const updated = prev.filter(b => b.id !== buildId);
        
        // Update current build ID if needed
        if (buildId === currentBuildId) {
          if (updated.length > 0) {
            setCurrentBuildId(updated[0].id);
          } else {
            setCurrentBuildId(null);
          }
        }
        
        return updated;
      });
    } catch (err) {
      console.error("Error deleting build:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else {
        setError("Failed to delete build");
      }
      throw err;
    }
  };

  // Get current build
  const currentBuild = builds.find(build => build.id === currentBuildId);

  // Calculate total price for current build
  const getBuildTotal = (buildId = currentBuildId) => {
    const build = builds.find(b => b.id === buildId);
    if (!build || !build.components) return 0;
    
    return Object.values(build.components).reduce((total, component) => {
      return total + (parseFloat(component.price) || 0);
    }, 0);
  };

  // Calculate cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + (parseFloat(item.price) || 0) * (item.quantity || 1);
    }, 0);
  };

  // Get cart item count
  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const value = {
    // State
    builds,
    currentBuildId,
    currentBuild,
    cart,
    loading,
    error,
    isAuthenticated: !!token,
    
    // Build actions
    setCurrentBuildId,
    addNewBuild,
    addProductToBuild,
    deleteBuild,
    updateBuildName,
    updateBuildStatus,
    getBuildTotal,
    
    // Cart actions
    addProductToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    
    // Data fetching
    fetchUserBuilds,
    fetchCart,
    
    // Error handling
    clearError: () => setError(null)
  };

  return (
    <BuildContext.Provider value={value}>
      {children}
    </BuildContext.Provider>
  );
};