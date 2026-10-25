const { StatusCodes } = require('http-status-codes');
const { OrderRepository, CartRepository, ProductRepository } = require('../repositories');
const { Order, OrderItem, Product, sequelize } = require('../models');
const { AppError } = require('../utils');

const orderRepository = new OrderRepository();
const cartRepository = new CartRepository();
const productRepository = new ProductRepository();

class OrderService {
    async checkout(userId, { shippingAddress, paymentMethod = 'stripe', paymentId }) {
        if (!shippingAddress) {
            throw new AppError('Shipping address is required for checkout', StatusCodes.BAD_REQUEST);
        }

        // Fetch user cart
        const cartItems = await cartRepository.getUserCart(userId);
        if (!cartItems || cartItems.length === 0) {
            throw new AppError('Cannot checkout an empty cart', StatusCodes.BAD_REQUEST);
        }

        // Execute checkout within a database transaction
        const transaction = await sequelize.transaction();

        try {
            let totalAmount = 0;

            // 1. Verify stock and calculate total
            for (const item of cartItems) {
                const product = await Product.findByPk(item.productId, { transaction });
                if (!product) {
                    throw new AppError(`Product with ID ${item.productId} no longer exists`, StatusCodes.NOT_FOUND);
                }
                if (product.stock < item.quantity) {
                    throw new AppError(
                        `Insufficient stock for "${product.name}". Available: ${product.stock}, in cart: ${item.quantity}`,
                        StatusCodes.BAD_REQUEST
                    );
                }
                totalAmount += parseFloat(product.price) * item.quantity;
            }

            // 2. Real/Mock payment verification
            // For PayPal / Stripe integration: transaction id can be passed from client SDK
            const finalPaymentId = paymentId || `MOCK_${paymentMethod.toUpperCase()}_${Date.now()}`;
            const paymentStatus = 'paid';

            // 3. Create Order
            const order = await Order.create(
                {
                    userId,
                    totalAmount: parseFloat(totalAmount.toFixed(2)),
                    paymentStatus,
                    paymentId: finalPaymentId,
                    shippingAddress
                },
                { transaction }
            );

            // 4. Create Order Items and Decrement Product Stock
            for (const item of cartItems) {
                const product = await Product.findByPk(item.productId, { transaction });

                await OrderItem.create(
                    {
                        orderId: order.id,
                        productId: product.id,
                        quantity: item.quantity,
                        price: product.price
                    },
                    { transaction }
                );

                // Deduct stock
                await product.decrement('stock', { by: item.quantity, transaction });
            }

            // 5. Clear Cart Items
            await cartRepository.clearCart(userId, { transaction });

            // Commit the entire transaction
            await transaction.commit();

            // Fetch and return complete order with items
            return await orderRepository.getOrderDetails(order.id, userId);
        } catch (error) {
            // Rollback on any failure
            await transaction.rollback();
            throw error;
        }
    }

    async getUserOrders(userId) {
        return await orderRepository.getUserOrders(userId);
    }

    async getOrderDetails(orderId, userId) {
        const order = await orderRepository.getOrderDetails(orderId, userId);
        if (!order) {
            throw new AppError('Order not found', StatusCodes.NOT_FOUND);
        }
        return order;
    }
}

module.exports = new OrderService();
