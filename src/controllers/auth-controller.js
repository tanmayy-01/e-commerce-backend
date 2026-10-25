const { StatusCodes } = require('http-status-codes');
const { AuthService } = require('../services');
const { successResponse } = require('../utils');

const register = async (req, res, next) => {
    try {
        const response = await AuthService.register(req.body);
        return res.status(StatusCodes.CREATED).json(
            successResponse('User registered successfully', response)
        );
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const response = await AuthService.login(req.body);
        return res.status(StatusCodes.OK).json(
            successResponse('User logged in successfully', response)
        );
    } catch (error) {
        next(error);
    }
};

const getProfile = async (req, res, next) => {
    try {
        const response = await AuthService.getProfile(req.user.id);
        return res.status(StatusCodes.OK).json(
            successResponse('User profile fetched successfully', response)
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    getProfile
};
