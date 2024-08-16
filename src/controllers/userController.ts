import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

const SALT_ROUNDS = 10;

interface CreateUserRequest extends Request {
    body: {
        username: string;
        email: string;
        password: string;
        role: string;
    };
}

interface LoginRequest extends Request {
    body: {
        username: string;
        password: string;
    };
}

export const createUser = async (req: CreateUserRequest, res: Response): Promise<void> => {
    try {
        const { username, email, password, role } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            role,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                role: newUser.role,
                email: newUser.email
            }
        });

    } catch (err) {
        console.error('Internal Server Error:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            error: err instanceof Error ? err.message : 'An unexpected error occurred'
        });
    }
};

export const login = async (req: LoginRequest, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });

        if (!user) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            SECRET_KEY, // Use the guaranteed-to-be-defined SECRET_KEY
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token
        });

    } catch (err) {
        console.error('Internal Server Error:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            error: err instanceof Error ? err.message : 'An unexpected error occurred'
        });
    }
};
