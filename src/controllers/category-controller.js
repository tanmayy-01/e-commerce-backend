const { StatusCodes } = require('http-status-codes');
const { CategoryService } = require('../services');
const { successResponse } = require('../utils');

const createCategory = async (req, res, next) => {
    try {
        const category = await CategoryService.createCategory(req.body);
        return res.status(StatusCodes.CREATED).json(
            successResponse('Category created successfully', category)
        );
    } catch (error) {
        next(error);
    }
};

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await CategoryService.getAllCategories();
        return res.status(StatusCodes.OK).json(
            successResponse('Categories fetched successfully', categories)
        );
    } catch (error) {
        next(error);
    }
};

const getCategoryById = async (req, res, next) => {
    try {
        const category = await CategoryService.getCategoryById(req.params.id);
        return res.status(StatusCodes.OK).json(
            successResponse('Category fetched successfully', category)
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById
};
