const express = require('express');
const { ProductController, ReviewController } = require('../../controllers');
const { authenticate } = require('../../middlewares');

const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductDetails);

// Product Reviews
router.post('/:productId/reviews', authenticate, ReviewController.addReview);
router.get('/:productId/reviews', ReviewController.getProductReviews);

module.exports = router;
