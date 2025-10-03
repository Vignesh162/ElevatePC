import { createContext, useState, useEffect } from "react";
import productsData from "../components/productsData";
export const BuildContext = createContext();

export function BuildProvider({ children }) {
  // Load initial builds from localStorage or fallback
  const [builds, setBuilds] = useState(() => {
    const saved = localStorage.getItem("builds");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Build 1",
            components: {
              cpu: null,
              motherboard: null,
              gpu: null,
              ram: null,
              storage: null,
              psu: null,
              case: null,
              cooler: null,
              monitor: null,
            },
          },
        ];
  });

  // Track which build is selected
  const [currentBuildId, setCurrentBuildId] = useState(() => {
    const saved = localStorage.getItem("currentBuildId");
    return saved ? JSON.parse(saved) : 1;
  });

  // Cart (for products when no build is selected)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync builds with localStorage
  useEffect(() => {
    localStorage.setItem("builds", JSON.stringify(builds));
  }, [builds]);

  // Sync current build ID
  useEffect(() => {
    localStorage.setItem("currentBuildId", JSON.stringify(currentBuildId));
  }, [currentBuildId]);

  // Sync cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add new build
  const addNewBuild = () => {
    const newId = builds.length + 1;
    setBuilds([
      ...builds,
      {
        id: newId,
        name: `Build ${newId}`,
        components: {
          cpu: null,
          motherboard: null,
          gpu: null,
          ram: null,
          storage: null,
          psu: null,
          case: null,
          cooler: null,
          monitor: null,
        },
      },
    ]);
    setCurrentBuildId(newId);
  };

  // Add/replace product in the current build
  const addProduct = (category, product) => {
    if (currentBuildId) {
      setBuilds((prev) =>
        prev.map((b) =>
          b.id === currentBuildId
            ? {
                ...b,
                components: { ...b.components, [category]: product },
              }
            : b
        )
      );
    } else {
      setCart((prev) => [...prev, product]);
    }
  };

  const addProductToCart = (product) => {
    setCart((prevItems) => {
      if (prevItems.some((item) => item.id === product.id)) {
        return prevItems; // already in cart
      }
      return [...prevItems, product];
    });
  };


  return (
    <BuildContext.Provider
      value={{
        builds,
        currentBuildId,
        setCurrentBuildId,
        addNewBuild,
        addProduct,
        cart,
        addProductToCart,
      }}
    >
      {children}
    </BuildContext.Provider>
  );
}
