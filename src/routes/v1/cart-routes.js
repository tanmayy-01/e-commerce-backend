const express = require('express');
const { CartController } = require('../../controllers');
const { authenticate } = require('../../middlewares');

const router = express.Router();

router.use(authenticate); // All cart routes require authentication

router.get('/', CartController.getUserCart);
router.post('/', CartController.addToCart);
router.put('/:id', CartController.updateCartItem);
router.delete('/:id', CartController.removeFromCart);
router.delete('/', CartController.clearCart);

module.exports = router;
