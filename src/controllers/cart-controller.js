const { StatusCodes } = require('http-status-codes');
const { CartService } = require('../services');
const { successResponse } = require('../utils');

const getUserCart = async (req, res, next) => {
    try {
        const cart = await CartService.getUserCart(req.user.id);
        return res.status(StatusCodes.OK).json(
            successResponse('Cart fetched successfully', cart)
        );
    } catch (error) {
        next(error);
    }
};

const addToCart = async (req, res, next) => {
    try {
        const item = await CartService.addToCart(req.user.id, req.body);
        return res.status(StatusCodes.CREATED).json(
            successResponse('Item added to cart successfully', item)
        );
    } catch (error) {
        next(error);
    }
};

const updateCartItem = async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const updatedItem = await CartService.updateCartItem(req.user.id, req.params.id, quantity);
        return res.status(StatusCodes.OK).json(
            successResponse('Cart item updated successfully', updatedItem)
        );
    } catch (error) {
        next(error);
    }
};

const removeFromCart = async (req, res, next) => {
    try {
        const response = await CartService.removeFromCart(req.user.id, req.params.id);
        return res.status(StatusCodes.OK).json(
            successResponse(response.message)
        );
    } catch (error) {
        next(error);
    }
};

const clearCart = async (req, res, next) => {
    try {
        const response = await CartService.clearCart(req.user.id);
        return res.status(StatusCodes.OK).json(
            successResponse(response.message)
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};
