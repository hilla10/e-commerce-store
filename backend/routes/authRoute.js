import { Router } from 'express';
import {
  getProfile,
  login,
  logout,
  refreshToken,
  signup,
} from '../controllers/authController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.get('/profile', protectRoute, getProfile);

export default router;
