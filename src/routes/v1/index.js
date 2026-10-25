const express = require('express');
const { InfoController } = require('../../controllers');

const authRoutes = require('./auth-routes');
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const cartRoutes = require('./cart-routes');
const orderRoutes = require('./order-routes');

const router = express.Router();

router.get('/info', InfoController.info);
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);

module.exports = router;