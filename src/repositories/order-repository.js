const CrudRepository = require('./crud-repository');
const { Order, OrderItem, Product } = require('../models');

class OrderRepository extends CrudRepository {
    constructor() {
        super(Order);
    }

    async getUserOrders(userId) {
        return await Order.findAll({
            where: { userId },
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [
                        {
                            model: Product,
                            as: 'product',
                            attributes: ['id', 'name', 'imageUrl']
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']]
        });
    }

    async getOrderDetails(orderId, userId) {
        return await Order.findOne({
            where: { id: orderId, userId },
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [
                        {
                            model: Product,
                            as: 'product',
                            attributes: ['id', 'name', 'imageUrl']
                        }
                    ]
                }
            ]
        });
    }
}

module.exports = OrderRepository;
