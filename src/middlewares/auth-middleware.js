const { StatusCodes } = require('http-status-codes');
const { verifyToken, errorResponse } = require('../utils');

const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(StatusCodes.UNAUTHORIZED).json(
                errorResponse('Access denied. No token provided.')
            );
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);
        req.user = decoded; // { id, email, role }
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json(
            errorResponse('Invalid or expired authentication token.', error.message)
        );
    }
};

module.exports = {
    authenticate
};
