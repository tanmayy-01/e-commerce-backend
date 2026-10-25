const { StatusCodes } = require('http-status-codes');
const { UserRepository } = require('../repositories');
const { AppError, hashPassword, comparePassword, generateToken } = require('../utils');

const userRepository = new UserRepository();

class AuthService {
    async register(data) {
        const { name, email, password } = data;

        if (!name || !email || !password) {
            throw new AppError('Name, email, and password are required', StatusCodes.BAD_REQUEST);
        }

        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new AppError('User with this email already exists', StatusCodes.CONFLICT);
        }

        const hashedPassword = await hashPassword(password);
        const user = await userRepository.create({
            name,
            email,
            password: hashedPassword
        });

        const token = generateToken({ id: user.id, email: user.email, role: user.role });

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        };
    }

    async login(data) {
        const { email, password } = data;

        if (!email || !password) {
            throw new AppError('Email and password are required', StatusCodes.BAD_REQUEST);
        }

        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Invalid email or password', StatusCodes.UNAUTHORIZED);
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            throw new AppError('Invalid email or password', StatusCodes.UNAUTHORIZED);
        }

        const token = generateToken({ id: user.id, email: user.email, role: user.role });

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        };
    }

    async getProfile(userId) {
        const user = await userRepository.get(userId);
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
    }
}

module.exports = new AuthService();
