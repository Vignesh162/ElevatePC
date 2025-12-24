const VALID_CATEGORIES = [
  "CPU", "GPU", "PSU", "Motherboard", "RAM", "Storage", 
  "Cooler", "Gaming Peripherals", "Monitor", "Case"
];

const CATEGORY_REQUIREMENTS = {
  CPU: ["socket", "tdp_watts", "cores", "threads"],
  GPU: ["tdp_watts", "vram"],
  PSU: ["wattage"],
  Motherboard: ["socket", "ram_type"],
  RAM: ["ram_type", "capacity_gb"],
  Storage: ["interface"]
};

const CATEGORIES_REQUIRING_TDP = ["CPU", "GPU"];

export const validateCreateProduct = (req, res, next) => {
  const { name, price, category, brand, details } = req.body;

  // Basic validation
  if (!name || typeof name !== "string") {
    return res.status(400).json({
      message: "Product name is required",
      error: "INVALID_NAME"
    });
  }

    const parsedPrice = Number(price);

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
    return res.status(400).json({
        message: "Price must be a valid number greater than zero",
        error: "INVALID_PRICE"
    });
    }
  if (!brand || typeof brand !== "string") {
    return res.status(400).json({
      message: "Brand name is required",
      error: "INVALID_BRAND_NAME"
    });
  }

  if (!VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({
      message: "Invalid product category",
      error: "INVALID_CATEGORY"
    });
  }

  if (!details || typeof details !== "object") {
    return res.status(400).json({
      message: "Product details are required",
      error: "INVALID_DETAILS"
    });
  }

  // Required fields per category
  const requiredFields = CATEGORY_REQUIREMENTS[category];
  for (const field of requiredFields) {
    if (details[field] === undefined || details[field] === null) {
      return res.status(400).json({
        message: `${field} is required for ${category}`,
        error: "MISSING_REQUIRED_SPEC"
      });
    }
  }

  // Normalize TDP (CPU/GPU only)
  if (CATEGORIES_REQUIRING_TDP.includes(category)) {
    const tdp = parseInt(
      details.tdp_watts ?? details.tdp ?? details.power,
      10
    );

    if (!tdp || isNaN(tdp) || tdp <= 0) {
      return res.status(400).json({
        message: `Valid TDP is required for ${category}`,
        error: "INVALID_TDP"
      });
    }

    details.tdp_watts = tdp;
    delete details.tdp;
    delete details.power;
  }

  // Normalize PSU wattage
  if (category === "PSU") {
    const wattage = parseInt(details.wattage, 10);

    if (!wattage || isNaN(wattage) || wattage <= 0) {
      return res.status(400).json({
        message: "Valid PSU wattage is required",
        error: "INVALID_PSU_WATTAGE"
      });
    }

    details.wattage = wattage;
  }

  next();
};

export const validateUpdateProduct = (req, res, next) => {
  const { name, price, rating, stock, category, details } = req.body;

  /* ❌ Category is IMMUTABLE */
  if (category !== undefined) {
    return res.status(400).json({
      message: "Product category cannot be changed",
      error: "CATEGORY_IMMUTABLE"
    });
  }

  /* ✅ Name (optional) */
  if (name !== undefined && typeof name !== "string") {
    return res.status(400).json({
      message: "Invalid product name",
      error: "INVALID_NAME"
    });
  }

  /* ✅ Price (optional, safe parsing) */
  if (price !== undefined) {
    const parsedPrice = Number(price);
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({
        message: "Price must be a valid number greater than zero",
        error: "INVALID_PRICE"
      });
    }
    req.body.price = parsedPrice;
  }

  /* ✅ Rating (optional) */
  if (rating !== undefined) {
    const parsedRating = Number(rating);
    if (
      !Number.isFinite(parsedRating) ||
      parsedRating < 0 ||
      parsedRating > 5
    ) {
      return res.status(400).json({
        message: "Rating must be between 0 and 5",
        error: "INVALID_RATING"
      });
    }
    req.body.rating = parsedRating;
  }

  /* ✅ Stock (optional) */
  if (stock !== undefined) {
    const parsedStock = Number(stock);
    if (!Number.isInteger(parsedStock) || parsedStock < 0) {
      return res.status(400).json({
        message: "Stock must be a non-negative integer",
        error: "INVALID_STOCK"
      });
    }
    req.body.stock = parsedStock;
  }

  /* ✅ Details (optional, category-aware validation) */
  if (details !== undefined) {
    if (typeof details !== "object" || Array.isArray(details)) {
      return res.status(400).json({
        message: "Invalid product details",
        error: "INVALID_DETAILS"
      });
    }

    const productCategory = req.existingProduct.category;

    /* 🔥 CPU / GPU → validate TDP only if user updates it */
    if (productCategory === "CPU" || productCategory === "GPU") {
      if ("tdp_watts" in details || "tdp" in details || "power" in details) {
        const tdp = parseInt(
          details.tdp_watts ?? details.tdp ?? details.power,
          10
        );

        if (!Number.isFinite(tdp) || tdp <= 0) {
          return res.status(400).json({
            message: "Valid TDP is required",
            error: "INVALID_TDP"
          });
        }

        details.tdp_watts = tdp;
        delete details.tdp;
        delete details.power;
      }
    }

    /* 🔌 PSU wattage (only if updated) */
    if (productCategory === "PSU" && "wattage" in details) {
      const wattage = parseInt(details.wattage, 10);
      if (!Number.isFinite(wattage) || wattage <= 0) {
        return res.status(400).json({
          message: "Valid PSU wattage is required",
          error: "INVALID_PSU_WATTAGE"
        });
      }
      details.wattage = wattage;
    }
  }

  next();
};
