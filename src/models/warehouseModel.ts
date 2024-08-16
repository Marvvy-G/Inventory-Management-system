import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';

interface WarehouseAttributes {
    id: number;
    name: string;
    location: string;
    capacity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface WarehouseCreationAttributes extends Optional<WarehouseAttributes, 'id'> {}

class Warehouse extends Model<WarehouseAttributes, WarehouseCreationAttributes> implements WarehouseAttributes {
    public id!: number;
    public name!: string;
    public location!: string;
    public capacity!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Warehouse.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacity: {
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
    tableName: 'warehouses', 
});

export default Warehouse;
