const { StatusCodes } = require('http-status-codes');
const { errorResponse } = require('../utils');

const errorHandler = (err, req, res, next) => {
    console.error('API Error:', err);

    // Custom AppError
    if (err.statusCode) {
        return res.status(err.statusCode).json(
            errorResponse(err.message, err.explanation || {})
        );
    }

    // Sequelize Validation Error
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        const errors = err.errors ? err.errors.map(e => e.message) : [err.message];
        return res.status(StatusCodes.BAD_REQUEST).json(
            errorResponse('Validation Error', errors)
        );
    }

    // Default Internal Server Error
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
        errorResponse('Something went wrong on the server', err.message || {})
    );
};

module.exports = {
    errorHandler
};
