const { StatusCodes } = require('http-status-codes');
const { ReviewRepository, ProductRepository } = require('../repositories');
const { AppError } = require('../utils');

const reviewRepository = new ReviewRepository();
const productRepository = new ProductRepository();

class ReviewService {
    async addReview(userId, productId, { rating, comment }) {
        if (!rating || rating < 1 || rating > 5) {
            throw new AppError('Rating must be an integer between 1 and 5', StatusCodes.BAD_REQUEST);
        }

        // Verify product exists
        await productRepository.get(productId);

        // Check if user already reviewed this product
        const existingReview = await reviewRepository.findUserReview(userId, productId);
        if (existingReview) {
            existingReview.rating = rating;
            existingReview.comment = comment || existingReview.comment;
            await existingReview.save();
            return existingReview;
        }

        return await reviewRepository.create({
            userId,
            productId: parseInt(productId, 10),
            rating: parseInt(rating, 10),
            comment: comment || ''
        });
    }

    async getProductReviews(productId) {
        // Verify product exists
        await productRepository.get(productId);
        return await reviewRepository.getProductReviews(productId);
    }
}

module.exports = new ReviewService();
