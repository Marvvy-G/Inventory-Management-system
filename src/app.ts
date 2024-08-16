import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import stockRoutes from './routes/stockRoutes';
import productRoutes from './routes/productRoutes';
import warehouseRoutes from './routes/warehouseRoutes'
import sequelize from './config/db';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/warehouse', warehouseRoutes);
app.use('/api/product', productRoutes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log('Database connection successful');
        return sequelize.sync();
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1); // Optional: Exit process if DB connection fails
    });
