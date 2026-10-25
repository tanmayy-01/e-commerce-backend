const { StatusCodes } = require('http-status-codes');
const { CategoryRepository } = require('../repositories');
const { AppError } = require('../utils');

const categoryRepository = new CategoryRepository();

class CategoryService {
    async createCategory(data) {
        if (!data.name) {
            throw new AppError('Category name is required', StatusCodes.BAD_REQUEST);
        }

        const existingCategory = await categoryRepository.findByName(data.name);
        if (existingCategory) {
            throw new AppError('Category with this name already exists', StatusCodes.CONFLICT);
        }

        return await categoryRepository.create(data);
    }

    async getAllCategories() {
        return await categoryRepository.getAll();
    }

    async getCategoryById(id) {
        return await categoryRepository.get(id);
    }
}

module.exports = new CategoryService();
