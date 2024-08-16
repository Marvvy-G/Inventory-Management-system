import { Request, Response } from 'express';
import Stock from '../models/stockModel';


export const getStocks = async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 10, ...filters } = req.query;
      const stocks = await Stock.findAll({
        where: filters as any,
        limit: Number(limit),
        offset: (Number(page) - 1) * Number(limit),
      });
      const total = await Stock.count({ where: filters as any });
      
      res.json({
        data: stocks,
        total,
        page: Number(page),
        limit: Number(limit)
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const getStockById = async (req: Request, res: Response) => {
    try {
      const stock = await Stock.findByPk(req.params.id);
      if (!stock) {
        return res.status(404).json({ message: 'Stock not found' });
      }
      res.json(stock);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const createStock = async (req: Request, res: Response) => {
    try {
        const { productId, warehouseId, quantity } = req.body;
        if (typeof productId !== 'number' || typeof warehouseId !== 'number' || typeof quantity !== 'number') {
            return res.status(400).json({ message: 'Invalid input data' });
        }
        const newStock = await Stock.create({
            productId,
            warehouseId,
            quantity
        });
      res.status(201).json(newStock);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const updateStock = async (req: Request, res: Response) => {
    try {
      const [updated] = await Stock.update(req.body, {
        where: { id: req.params.id },
        returning: true
      });
      if (!updated) {
        return res.status(404).json({ message: 'Stock not found' });
      }
      const updatedStock = await Stock.findByPk(req.params.id);
      res.json(updatedStock);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const deleteStock = async (req: Request, res: Response) => {
    try {
      const deleted = await Stock.destroy({
        where: { id: req.params.id }
      });
      if (!deleted) {
        return res.status(404).json({ message: 'Stock not found' });
      }
      res.json({ message: 'Stock deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };