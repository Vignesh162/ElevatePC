import express from 'express';
import pool from '../config/db.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
import { getAllProducts, getProductByID, addProduct } from '../controllers/productContoller.js';
const router = express.Router();

// get all products
router.get("/", getAllProducts);

// get product by id
router.get("/:id", getProductByID);

// admin routes
// add product 
router.post("/add",authenticateToken, authorizeRoles("admin"), addProduct);
router.post("/update/:id",authenticateToken, authorizeRoles("admin"), addProduct);
router.post("/delete/:id",authenticateToken, authorizeRoles("admin"), addProduct);
export default router;