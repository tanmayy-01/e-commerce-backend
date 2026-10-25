const express = require('express');
const { AuthController } = require('../../controllers');
const { authenticate } = require('../../middlewares');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', authenticate, AuthController.getProfile);

module.exports = router;
