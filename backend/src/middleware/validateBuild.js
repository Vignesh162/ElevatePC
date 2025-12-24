import pool from "../config/db.js";
import { checkCompatibility } from "../services/compatibilityService.js";

export const validateBuild = async (req, res, next) => {
  const { components } = req.body;

  // ✅ Allow empty or missing components (draft build)
  if (!components || components.length === 0) {
    req.compatibility = {
      blockers: [],
      warnings: []
    };
    return next();
  }

  // If provided, components must be an array
  if (!Array.isArray(components)) {
    return res.status(400).json({
      message: "Components must be an array",
      error: "INVALID_COMPONENTS"
    });
  }

  // Validate each component shape
  for (const c of components) {
    if (!c.product_id || !c.category) {
      return res.status(400).json({
        message: "Each component must have product_id and category",
        error: "INVALID_COMPONENT"
      });
    }
  }

  // Fetch product data
  const productIds = components.map(c => c.product_id);
  const result = await pool.query(
    `SELECT id, category, details
     FROM products
     WHERE id = ANY($1::int[])`,
    [productIds]
  );

  if (result.rows.length !== components.length) {
    return res.status(400).json({
      message: "One or more products not found",
      error: "PRODUCT_NOT_FOUND"
    });
  }

  // Run compatibility checks
  const compatibility = checkCompatibility(result.rows);
  if( compatibility.blockers.length > 0){
    compatibility.status = "blocked";
  }
  else if( compatibility.warnings.length > 0){
    compatibility.status = "warning";
  }
  else{
    compatibility.status = "ok";
  }
  // Attach to request
  req.compatibility = compatibility;

  next();
};
