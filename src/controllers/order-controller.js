const { StatusCodes } = require('http-status-codes');
const { OrderService } = require('../services');
const { successResponse } = require('../utils');

const checkout = async (req, res, next) => {
    try {
        const order = await OrderService.checkout(req.user.id, req.body);
        return res.status(StatusCodes.CREATED).json(
            successResponse('Order placed successfully', order)
        );
    } catch (error) {
        next(error);
    }
};

const getUserOrders = async (req, res, next) => {
    try {
        const orders = await OrderService.getUserOrders(req.user.id);
        return res.status(StatusCodes.OK).json(
            successResponse('Orders fetched successfully', orders)
        );
    } catch (error) {
        next(error);
    }
};

const getOrderDetails = async (req, res, next) => {
    try {
        const order = await OrderService.getOrderDetails(req.params.id, req.user.id);
        return res.status(StatusCodes.OK).json(
            successResponse('Order details fetched successfully', order)
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    checkout,
    getUserOrders,
    getOrderDetails
};
