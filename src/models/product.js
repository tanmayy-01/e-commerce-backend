'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
            Product.hasMany(models.CartItem, { foreignKey: 'productId', as: 'cartItems' });
            Product.hasMany(models.OrderItem, { foreignKey: 'productId', as: 'orderItems' });
            Product.hasMany(models.Review, { foreignKey: 'productId', as: 'reviews' });
        }
    }

    Product.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    min: 0
                }
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    min: 0
                }
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: true
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'categories',
                    key: 'id'
                }
            }
        },
        {
            sequelize,
            modelName: 'Product',
            tableName: 'products',
            underscored: true
        }
    );

    return Product;
};
