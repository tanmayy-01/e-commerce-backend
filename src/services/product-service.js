const { StatusCodes } = require('http-status-codes');
const { ProductRepository, CategoryRepository } = require('../repositories');
const { AppError } = require('../utils');

const productRepository = new ProductRepository();
const categoryRepository = new CategoryRepository();

class ProductService {
    async createProduct(data) {
        const { name, price, categoryId, stock } = data;

        if (!name || price === undefined || !categoryId) {
            throw new AppError('Product name, price, and categoryId are required', StatusCodes.BAD_REQUEST);
        }

        // Validate that category exists
        await categoryRepository.get(categoryId);

        return await productRepository.create({
            name,
            description: data.description || '',
            price: parseFloat(price),
            stock: stock !== undefined ? parseInt(stock, 10) : 0,
            imageUrl: data.imageUrl || null,
            categoryId
        });
    }

    async getProducts(queryParams) {
        return await productRepository.getProducts(queryParams);
    }

    async getProductDetails(id) {
        const product = await productRepository.getProductWithDetails(id);
        if (!product) {
            throw new AppError('Product not found', StatusCodes.NOT_FOUND);
        }
        return product;
    }
}

module.exports = new ProductService();
