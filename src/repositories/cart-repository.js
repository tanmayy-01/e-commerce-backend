const CrudRepository = require('./crud-repository');
const { CartItem, Product } = require('../models');

class CartRepository extends CrudRepository {
    constructor() {
        super(CartItem);
    }

    async getUserCart(userId) {
        return await CartItem.findAll({
            where: { userId },
            include: [
                {
                    model: Product,
                    as: 'product',
                    attributes: ['id', 'name', 'price', 'imageUrl', 'stock']
                }
            ]
        });
    }

    async findItem(userId, productId) {
        return await CartItem.findOne({
            where: { userId, productId }
        });
    }

    async clearCart(userId, options = {}) {
        return await CartItem.destroy({
            where: { userId },
            ...options
        });
    }
}

module.exports = CartRepository;
