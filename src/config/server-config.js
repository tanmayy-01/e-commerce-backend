const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'super_secret_jwt_ecommerce_key_2026',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
};