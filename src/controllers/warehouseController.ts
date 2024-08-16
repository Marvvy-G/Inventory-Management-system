import { Request, Response } from 'express';
import Warehouse from '../models/warehouseModel';

export const getWarehouses = async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 10, ...filters } = req.query;
      const warehouses = await Warehouse.findAll({
        where: filters as any,
        limit: Number(limit),
        offset: (Number(page) - 1) * Number(limit),
      });
      const total = await Warehouse.count({ where: filters as any });
      
      res.json({
        data: warehouses,
        total,
        page: Number(page),
        limit: Number(limit)
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const getWarehouseById = async (req: Request, res: Response) => {
    try {
      const warehouse = await Warehouse.findByPk(req.params.id);
      if (!warehouse) {
        return res.status(404).json({ message: 'Warehouse not found' });
      }
      res.json(warehouse);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const createWarehouse = async (req: Request, res: Response) => {
    try {
      const { name, location, capacity } = req.body;
      const newWarehouse = await Warehouse.create({ name, location, capacity });
      res.status(201).json(newWarehouse);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const updateWarehouse = async (req: Request, res: Response) => {
    try {
      const [updated] = await Warehouse.update(req.body, {
        where: { id: req.params.id },
        returning: true
      });
      if (!updated) {
        return res.status(404).json({ message: 'Warehouse not found' });
      }
      const updatedWarehouse = await Warehouse.findByPk(req.params.id);
      res.json(updatedWarehouse);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const deleteWarehouse = async (req: Request, res: Response) => {
    try {
      const deleted = await Warehouse.destroy({
        where: { id: req.params.id }
      });
      if (!deleted) {
        return res.status(404).json({ message: 'Warehouse not found' });
      }
      res.json({ message: 'Warehouse deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };