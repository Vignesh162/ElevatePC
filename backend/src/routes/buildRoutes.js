import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
import { 
    getAllBuilds, 
    getBuildById, 
    getUserBuilds, 
    createBuild, 
    updateBuild, 
    deleteBuild } from '../controllers/buildController.js';

const router = express.Router();

// Get All builds 
router.get("/all",authenticateToken, authorizeRoles("admin"), getAllBuilds);

// Get User build
router.get("/user", authenticateToken, getUserBuilds);

// Get Build by id
router.get("/:id", authenticateToken, getBuildById);

// Create Build
router.post("/create", authenticateToken, createBuild);

// Update Build
router.put("/update/:id", authenticateToken, updateBuild);

// Delete Build
router.delete("/delete/:id", authenticateToken, deleteBuild);

export default router;