import express from "express";
import pool from "../config/db.js";
import { authenticateToken } from "../middleware/auth.js";

import { getCart,
  updateCart,
  addCartItem,
  removeCartItem
} from "../controllers/cartController.js";
const router = express.Router();

/**
 * GET /cart/:userId
 * Fetch user's cart with product details
 */
router.get("/", authenticateToken, getCart);

/**
 * PUT /cart/:userId
 * Update entire cart
 */
router.put("/", authenticateToken, updateCart);

/**
 * POST /cart/:userId/add
 * Add single product to cart
 */
router.post("/", authenticateToken, addCartItem );

/**
 * DELETE /cart/:userId/remove/:productId
 * Remove single product
 */
router.delete("/:productId", authenticateToken, removeCartItem );

export default router;
