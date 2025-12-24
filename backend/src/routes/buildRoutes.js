import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { 
    getAllBuilds, 
    getBuildById, 
    getUserBuilds, 
    createBuild, 
    updateBuild, 
    deleteBuild, 
    updateBuildMeta} from '../controllers/buildController.js';
import { validateBuild } from '../middleware/validateBuild.js';

const router = express.Router();

// Get All builds 
router.get("/",authenticateToken, authorizeRoles("admin"), getAllBuilds);

// Get User build
router.get("/me", authenticateToken, getUserBuilds);

// Get Build by id
router.get("/:id", authenticateToken, getBuildById);

// Create Build
router.post("/", authenticateToken,validateBuild, createBuild);

// Update Build
router.put("/:id", authenticateToken, validateBuild, updateBuild);

// Update Build Metadata
router.patch("/:id", authenticateToken, updateBuildMeta);
// Delete Build
router.delete("/:id", authenticateToken, deleteBuild);

export default router;