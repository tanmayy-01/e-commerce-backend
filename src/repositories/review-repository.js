const CrudRepository = require('./crud-repository');
const { Review, User } = require('../models');

class ReviewRepository extends CrudRepository {
    constructor() {
        super(Review);
    }

    async getProductReviews(productId) {
        return await Review.findAll({
            where: { productId },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
    }

    async findUserReview(userId, productId) {
        return await Review.findOne({
            where: { userId, productId }
        });
    }
}

module.exports = ReviewRepository;
