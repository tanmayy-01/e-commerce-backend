'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            Order.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'items' });
        }
    }

    Order.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            totalAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            paymentStatus: {
                type: DataTypes.ENUM('pending', 'paid', 'failed'),
                defaultValue: 'pending'
            },
            paymentId: {
                type: DataTypes.STRING,
                allowNull: true
            },
            shippingAddress: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Order',
            tableName: 'orders',
            underscored: true
        }
    );

    return Order;
};
