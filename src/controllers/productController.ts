import { Request, Response } from 'express';
import Product from '../models/productModel'; 

interface GetProductsRequest extends Request {
    query: {
        page?: string;
        limit?: string;
        name?: string; 
    };
}

interface CreateProductRequest extends Request {
    body: {
        name: string;
        description: string;
        price: number;
    };
}

interface UpdateProductRequest extends Request {
    body: {
        name?: string;
        description?: string;
        price?: number;
    };
}

export const getProducts = async (req: GetProductsRequest, res: Response): Promise<void> => {
    try {
        const { page = '1', limit = '10', name } = req.query;
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        const filters = name ? { where: { name } } : {};

        const products = await Product.findAll({
            ...filters,
            offset: (pageNumber - 1) * limitNumber,
            limit: limitNumber,
        });

        res.status(200).json({
            message: 'Products retrieved successfully',
            products,
        });
    } catch (err) {
        console.error('Internal Server Error:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            error: err instanceof Error ? err.message : 'An unexpected error occurred'
        });
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return 
        }

        res.status(200).json({
            message: 'Product retrieved successfully',
            product,
        });
    } catch (err) {
        console.error('Internal Server Error:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            error: err instanceof Error ? err.message : 'An unexpected error occurred'
        });
    }
};

export const createProduct = async (req: CreateProductRequest, res: Response): Promise<void> => {
    try {
        const { name, description, price } = req.body;

        const newProduct = await Product.create({
            name,
            description,
            price,
        });

        res.status(201).json({
            message: 'Product created successfully',
            product: newProduct,
        });
    } catch (err) {
        console.error('Internal Server Error:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            error: err instanceof Error ? err.message : 'An unexpected error occurred'
        });
    }
};


export const updateProduct = async (req: UpdateProductRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;

        const product = await Product.findByPk(id);

        if (!product) {
             res.status(404).json({ message: 'Product not found' });
             return
        }

        await product.update({
            name: name || product.name,
            description: description || product.description,
            price: price || product.price,
        });

        res.status(200).json({
            message: 'Product updated successfully',
            product,
        });
    } catch (err) {
        console.error('Internal Server Error:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            error: err instanceof Error ? err.message : 'An unexpected error occurred'
        });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
             res.status(404).json({ message: 'Product not found' });
             return
        }

        await product.destroy();

        res.status(200).json({
            message: 'Product deleted successfully',
        });
    } catch (err) {
        console.error('Internal Server Error:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            error: err instanceof Error ? err.message : 'An unexpected error occurred'
        });
    }
};