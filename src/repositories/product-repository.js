const { Op } = require('sequelize');
const CrudRepository = require('./crud-repository');
const { Product, Category, Review, User } = require('../models');

class ProductRepository extends CrudRepository {
    constructor() {
        super(Product);
    }

    async getProducts({ page = 1, limit = 10, search, categoryId, sortBy = 'createdAt', order = 'DESC' }) {
        const offset = (page - 1) * limit;
        const whereClause = {};

        if (search) {
            whereClause[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } }
            ];
        }

        if (categoryId) {
            whereClause.categoryId = categoryId;
        }

        const { count, rows } = await Product.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name']
                }
            ],
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
            order: [[sortBy, order.toUpperCase()]]
        });

        return {
            totalProducts: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page, 10),
            products: rows
        };
    }

    async getProductWithDetails(id) {
        return await Product.findByPk(id, {
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name', 'description']
                },
                {
                    model: Review,
                    as: 'reviews',
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ]
        });
    }
}

module.exports = ProductRepository;
