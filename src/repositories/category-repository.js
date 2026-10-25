const CrudRepository = require('./crud-repository');
const { Category } = require('../models');

class CategoryRepository extends CrudRepository {
    constructor() {
        super(Category);
    }

    async findByName(name) {
        return await Category.findOne({ where: { name } });
    }
}

module.exports = CategoryRepository;
