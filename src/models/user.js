'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.CartItem, { foreignKey: 'userId', as: 'cartItems' });
            User.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });
            User.hasMany(models.Review, { foreignKey: 'userId', as: 'reviews' });
        }
    }

    User.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.ENUM('customer', 'admin'),
                defaultValue: 'customer'
            }
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            underscored: true
        }
    );

    return User;
};
