const { Category, Product, sequelize } = require('../models');

const categoriesData = [
    {
        name: 'Electronics',
        description: 'Smartphones, laptops, audio gadgets, and modern tech accessories.'
    },
    {
        name: 'Fashion & Apparel',
        description: 'Trendy clothing, shoes, jackets, and everyday lifestyle wear.'
    },
    {
        name: 'Home & Kitchen',
        description: 'Appliances, premium cookware, and essentials for comfortable living.'
    },
    {
        name: 'Sports & Fitness',
        description: 'Workout gear, athletic equipment, and fitness accessories.'
    },
    {
        name: 'Books & Learning',
        description: 'Bestselling books on technology, personal growth, and fiction.'
    }
];

const getProductsData = (categoryMap) => [
    // Electronics
    {
        name: 'Sony WH-1000XM5 Noise-Canceling Headphones',
        description: 'Industry-leading wireless noise-canceling headphones with 30-hour battery life and crystal clear calling.',
        price: 349.99,
        stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
        categoryId: categoryMap['Electronics']
    },
    {
        name: 'Logitech MX Master 3S Wireless Mouse',
        description: 'Quiet-click ergonomic precision mouse with 8K DPI sensor and ultra-fast MagSpeed scrolling.',
        price: 99.99,
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600',
        categoryId: categoryMap['Electronics']
    },
    {
        name: 'Apple MacBook Air 15-inch M2',
        description: 'Ultra-thin laptop with stunning Liquid Retina display, 18-hour battery life, and powerful M2 chip.',
        price: 1299.00,
        stock: 12,
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
        categoryId: categoryMap['Electronics']
    },
    {
        name: 'Dell 27-inch 4K UHD USB-C Monitor',
        description: 'Sleek IPS monitor with 99% sRGB color coverage, 60W power delivery, and HDR support.',
        price: 379.50,
        stock: 18,
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600',
        categoryId: categoryMap['Electronics']
    },
    {
        name: 'Keychron K2 Mechanical Keyboard',
        description: 'Compact 75% wireless mechanical keyboard with RGB backlighting and Gateron Brown switches.',
        price: 89.99,
        stock: 35,
        imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600',
        categoryId: categoryMap['Electronics']
    },

    // Fashion & Apparel
    {
        name: 'Classic Organic Cotton Crewneck T-Shirt',
        description: 'Ultra-soft, breathable 100% organic cotton everyday t-shirt with a modern tailored fit.',
        price: 24.99,
        stock: 80,
        imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600',
        categoryId: categoryMap['Fashion & Apparel']
    },
    {
        name: 'Levi’s Denim Slim Fit Trucker Jacket',
        description: 'Iconic durable denim jacket with button flap chest pockets and adjustable waist tabs.',
        price: 89.50,
        stock: 30,
        imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600',
        categoryId: categoryMap['Fashion & Apparel']
    },
    {
        name: 'Nike Air Max 270 Athletic Sneakers',
        description: 'Modern lifestyle and running shoes with a large Max Air unit for all-day cushioning.',
        price: 159.99,
        stock: 22,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
        categoryId: categoryMap['Fashion & Apparel']
    },
    {
        name: 'Minimalist Water-Resistant Everyday Backpack',
        description: 'Spacious laptop backpack with padded compartment, hidden anti-theft pocket, and USB charging port.',
        price: 54.00,
        stock: 45,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
        categoryId: categoryMap['Fashion & Apparel']
    },

    // Home & Kitchen
    {
        name: 'Breville Barista Touch Espresso Machine',
        description: 'Automated touch screen espresso maker with integrated precision grinder and micro-foam milk texturing.',
        price: 999.95,
        stock: 8,
        imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600',
        categoryId: categoryMap['Home & Kitchen']
    },
    {
        name: 'Ninja Digital Air Fryer & Convection Oven',
        description: '8-in-1 multi-cooker that air fries, roasts, broils, and bakes with 75% less fat than deep frying.',
        price: 179.99,
        stock: 19,
        imageUrl: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600',
        categoryId: categoryMap['Home & Kitchen']
    },
    {
        name: 'Cast Iron Enameled Dutch Oven (6 Quart)',
        description: 'Heavy-duty enameled cast iron pot with lid for superior heat retention, slow cooking, and braising.',
        price: 79.90,
        stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600',
        categoryId: categoryMap['Home & Kitchen']
    },
    {
        name: 'Hydro Flask 32 oz Wide Mouth Water Bottle',
        description: 'TempShield double-wall vacuum insulated stainless steel bottle that keeps liquids cold up to 24 hours.',
        price: 39.95,
        stock: 60,
        imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600',
        categoryId: categoryMap['Home & Kitchen']
    },

    // Sports & Fitness
    {
        name: 'Bowflex SelectTech 552 Adjustable Dumbbells',
        description: 'Rapid dial system adjusting from 5 to 52.5 lbs in 2.5 lb increments, replacing 15 sets of weights.',
        price: 429.00,
        stock: 10,
        imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600',
        categoryId: categoryMap['Sports & Fitness']
    },
    {
        name: 'Manduka PRO High-Density Yoga Mat',
        description: 'Extra thick 6mm non-slip dense cushioning mat designed for joint protection and lifetime durability.',
        price: 120.00,
        stock: 35,
        imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600',
        categoryId: categoryMap['Sports & Fitness']
    },
    {
        name: 'Fitbit Charge 6 Fitness & Health Tracker',
        description: 'Heart rate monitor, built-in GPS, sleep tracking, and daily readiness score with 7-day battery life.',
        price: 149.95,
        stock: 28,
        imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600',
        categoryId: categoryMap['Sports & Fitness']
    },

    // Books & Learning
    {
        name: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        description: 'Legendary software engineering guide by Robert C. Martin on writing elegant, readable, and maintainable code.',
        price: 44.99,
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?w=600',
        categoryId: categoryMap['Books & Learning']
    },
    {
        name: 'Atomic Habits by James Clear',
        description: 'An easy & proven way to build good habits and break bad ones using small behavioral changes.',
        price: 18.20,
        stock: 75,
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600',
        categoryId: categoryMap['Books & Learning']
    }
];

async function seedDatabase() {
    try {
        console.log('Connecting to database...');
        await sequelize.authenticate();
        console.log('Database connection verified.');

        // Clean up existing products and categories safely (Products first due to foreign key)
        console.log('Clearing existing product and category records...');
        await Product.destroy({ where: {} });
        await Category.destroy({ where: {} });

        // 1. Seed Categories
        console.log('Seeding categories...');
        const createdCategories = await Category.bulkCreate(categoriesData);
        console.log(`Successfully seeded ${createdCategories.length} categories.`);

        // Build name -> ID mapping
        const categoryMap = {};
        createdCategories.forEach(cat => {
            categoryMap[cat.name] = cat.id;
        });

        // 2. Seed Products
        console.log('Seeding products...');
        const productsData = getProductsData(categoryMap);
        const createdProducts = await Product.bulkCreate(productsData);
        console.log(`Successfully seeded ${createdProducts.length} products across ${createdCategories.length} categories.`);

        console.log('\nDatabase seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
