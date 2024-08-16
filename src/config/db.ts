

import { Sequelize } from 'sequelize-typescript';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME as string,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  models: [path.join(__dirname, '/models')], 
  logging: false, 
});

export default sequelize;

