const { StatusCodes } = require('http-status-codes');
const { ProductService } = require('../services');
const { successResponse } = require('../utils');

const createProduct = async (req, res, next) => {
    try {
        const product = await ProductService.createProduct(req.body);
        return res.status(StatusCodes.CREATED).json(
            successResponse('Product created successfully', product)
        );
    } catch (error) {
        next(error);
    }
};

const getProducts = async (req, res, next) => {
    try {
        const result = await ProductService.getProducts(req.query);
        return res.status(StatusCodes.OK).json(
            successResponse('Products fetched successfully', result)
        );
    } catch (error) {
        next(error);
    }
};

const getProductDetails = async (req, res, next) => {
    try {
        const product = await ProductService.getProductDetails(req.params.id);
        return res.status(StatusCodes.OK).json(
            successResponse('Product details fetched successfully', product)
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductDetails
};
