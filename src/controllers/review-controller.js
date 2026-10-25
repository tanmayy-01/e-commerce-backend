const { StatusCodes } = require('http-status-codes');
const { ReviewService } = require('../services');
const { successResponse } = require('../utils');

const addReview = async (req, res, next) => {
    try {
        const review = await ReviewService.addReview(req.user.id, req.params.productId, req.body);
        return res.status(StatusCodes.CREATED).json(
            successResponse('Review added successfully', review)
        );
    } catch (error) {
        next(error);
    }
};

const getProductReviews = async (req, res, next) => {
    try {
        const reviews = await ReviewService.getProductReviews(req.params.productId);
        return res.status(StatusCodes.OK).json(
            successResponse('Reviews fetched successfully', reviews)
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addReview,
    getProductReviews
};
