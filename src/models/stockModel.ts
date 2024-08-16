import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import Product from './productModel';  // Import the Product model
import Warehouse from './warehouseModel';  // Import the Warehouse model

interface StockAttributes {
    id: number;
    productId: number;
    warehouseId: number;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface StockCreationAttributes extends Optional<StockAttributes, 'id'> {}

class Stock extends Model<StockAttributes, StockCreationAttributes> implements StockAttributes {
    public id!: number;
    public productId!: number;
    public warehouseId!: number;
    public quantity!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Stock.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: 'products', 
            key: 'id',
        },
        allowNull: false,
    },
    warehouseId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: 'warehouses', 
            key: 'id',
        },
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize, 
    tableName: 'stocks', 
});

Stock.belongsTo(Product, { foreignKey: 'productId' });
Stock.belongsTo(Warehouse, { foreignKey: 'warehouseId' });

export default Stock;
