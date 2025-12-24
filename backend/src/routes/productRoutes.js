import express from 'express';
import pool from '../config/db.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { getAllProducts, getProductByID, addProduct, deleteProduct, updateProduct } from '../controllers/productController.js';
import { validateCreateProduct, validateUpdateProduct } from '../middleware/productValidation.js';
const router = express.Router();

// get all products
router.get("/", getAllProducts);

// get product by id
router.get("/:id", getProductByID);

// admin routes
// add product 
router.post("/",authenticateToken, authorizeRoles("admin"), validateCreateProduct, addProduct);

// update product 
router.put("/:id",authenticateToken, authorizeRoles("admin"), validateUpdateProduct, updateProduct);

// delete product
router.delete("/:id",authenticateToken, authorizeRoles("admin"), deleteProduct);

export default router;