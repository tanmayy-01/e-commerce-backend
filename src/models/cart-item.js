'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CartItem extends Model {
        static associate(models) {
            CartItem.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            CartItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
        }
    }

    CartItem.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'products',
                    key: 'id'
                }
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
                validate: {
                    min: 1
                }
            }
        },
        {
            sequelize,
            modelName: 'CartItem',
            tableName: 'cart_items',
            underscored: true
        }
    );

    return CartItem;
};
