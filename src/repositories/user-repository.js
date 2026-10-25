const CrudRepository = require('./crud-repository');
const { User } = require('../models');

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }
}

module.exports = UserRepository;
