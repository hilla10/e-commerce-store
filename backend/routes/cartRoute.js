import { Router } from 'express';
import {
  addToCart,
  removeAllFromCart,
  updateQuantity,
  getCartProducts,
} from '../controllers/cartController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', protectRoute, getCartProducts);
router.post('/', protectRoute, addToCart);
router.delete('/', protectRoute, removeAllFromCart);
router.put('/:id', protectRoute, updateQuantity);

export default router;
