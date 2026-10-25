const { StatusCodes } = require('http-status-codes');
const { CartRepository, ProductRepository } = require('../repositories');
const { AppError } = require('../utils');

const cartRepository = new CartRepository();
const productRepository = new ProductRepository();

class CartService {
    async getUserCart(userId) {
        const items = await cartRepository.getUserCart(userId);

        let totalPrice = 0;
        const formattedItems = items.map(item => {
            const itemPrice = parseFloat(item.product.price);
            const itemTotal = itemPrice * item.quantity;
            totalPrice += itemTotal;

            return {
                id: item.id,
                productId: item.productId,
                productName: item.product.name,
                price: itemPrice,
                imageUrl: item.product.imageUrl,
                stock: item.product.stock,
                quantity: item.quantity,
                itemTotal: parseFloat(itemTotal.toFixed(2))
            };
        });

        return {
            items: formattedItems,
            totalItems: formattedItems.reduce((acc, curr) => acc + curr.quantity, 0),
            totalPrice: parseFloat(totalPrice.toFixed(2))
        };
    }

    async addToCart(userId, { productId, quantity = 1 }) {
        if (!productId || quantity < 1) {
            throw new AppError('Valid productId and quantity (min 1) are required', StatusCodes.BAD_REQUEST);
        }

        const product = await productRepository.get(productId);
        if (!product) {
            throw new AppError('Product not found', StatusCodes.NOT_FOUND);
        }

        const existingCartItem = await cartRepository.findItem(userId, productId);
        const desiredQuantity = existingCartItem ? existingCartItem.quantity + parseInt(quantity, 10) : parseInt(quantity, 10);

        if (desiredQuantity > product.stock) {
            throw new AppError(`Cannot add ${quantity} item(s). Available stock is only ${product.stock}`, StatusCodes.BAD_REQUEST);
        }

        if (existingCartItem) {
            existingCartItem.quantity = desiredQuantity;
            await existingCartItem.save();
            return existingCartItem;
        }

        return await cartRepository.create({
            userId,
            productId,
            quantity: desiredQuantity
        });
    }

    async updateCartItem(userId, cartItemId, quantity) {
        if (!quantity || quantity < 1) {
            throw new AppError('Quantity must be at least 1', StatusCodes.BAD_REQUEST);
        }

        const cartItem = await cartRepository.get(cartItemId);
        if (cartItem.userId !== userId) {
            throw new AppError('Unauthorized access to cart item', StatusCodes.FORBIDDEN);
        }

        const product = await productRepository.get(cartItem.productId);
        if (quantity > product.stock) {
            throw new AppError(`Requested quantity exceeds available stock (${product.stock})`, StatusCodes.BAD_REQUEST);
        }

        cartItem.quantity = parseInt(quantity, 10);
        await cartItem.save();
        return cartItem;
    }

    async removeFromCart(userId, cartItemId) {
        const cartItem = await cartRepository.get(cartItemId);
        if (cartItem.userId !== userId) {
            throw new AppError('Unauthorized access to cart item', StatusCodes.FORBIDDEN);
        }

        await cartRepository.destroy(cartItemId);
        return { message: 'Item removed from cart successfully' };
    }

    async clearCart(userId) {
        await cartRepository.clearCart(userId);
        return { message: 'Cart cleared successfully' };
    }
}

module.exports = new CartService();
