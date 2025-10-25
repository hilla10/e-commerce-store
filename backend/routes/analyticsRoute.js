import { Router } from 'express';
import { adminRoute, protectRoute } from '../middlewares/authMiddleware.js';
import { getAnalytics } from '../controllers/analyticsController.js';

const router = Router();

router.get('/', protectRoute, adminRoute, getAnalytics);

export default router;
