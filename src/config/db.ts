import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import Product from '../models/productModel'; 
import User from '../models/userModel';
import Stock from '../models/stockModel';
import Warehouse from '../models/warehouseModel';

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME as string,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    models: [Product, User, Stock, Warehouse],
});

export default sequelize;
