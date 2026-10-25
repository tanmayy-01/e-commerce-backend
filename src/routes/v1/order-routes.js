const express = require('express');
const { OrderController } = require('../../controllers');
const { authenticate } = require('../../middlewares');

const router = express.Router();

router.use(authenticate); // All order routes require authentication

router.post('/checkout', OrderController.checkout);
router.get('/', OrderController.getUserOrders);
router.get('/:id', OrderController.getOrderDetails);

module.exports = router;
