const express = require('express');
const { CategoryController } = require('../../controllers');

const router = express.Router();

router.post('/', CategoryController.createCategory);
router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);

module.exports = router;
