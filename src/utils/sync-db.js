const db = require('../models');

async function syncDatabase() {
    try {
        console.log('Connecting to database...');
        await db.sequelize.authenticate();
        console.log('Database connection established successfully.');

        console.log('Synchronizing tables with MySQL...');
        await db.sequelize.sync({ alter: true });
        console.log('All 6 tables (users, categories, products, cart_items, orders, order_items, reviews) synchronized successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error synchronizing database:', error.message);
        process.exit(1);
    }
}

syncDatabase();
