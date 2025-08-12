import express from 'express'
import { followUser, getCurrentUser, getUserProfile, syncUser, updateProfile } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router()

// public route
router.get("/profile/:username", getUserProfile)

// protected routes
router.post("/sync", protectRoute, syncUser)
router.put("/profile", protectRoute, updateProfile)
router.get("/me", protectRoute, getCurrentUser)
router.post("/follow/:targetUserId", protectRoute, followUser)

export default router;