import {Router} from 'express';
import {getStocks, getStockById, createStock, updateStock, deleteStock} from '../controllers/stockController';

const router = Router();

router.get("/stock", getStocks);
router.get("/stock/:id", getStockById);
router.post("/stock", createStock);
router.put("/stock/:id", updateStock);
router.delete("/stock/:id", deleteStock);

export default router;