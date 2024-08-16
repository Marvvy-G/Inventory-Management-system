import {Router} from 'express';
import { authenticateToken } from '../middlewares/authMiddleware'
import {getStocks, getStockById, createStock, updateStock, deleteStock} from '../controllers/stockController';

const router = Router();

router.get("/stock", authenticateToken, getStocks);
router.get("/stock/:id", authenticateToken, getStockById);
router.post("/stock", authenticateToken, createStock);
router.put("/stock/:id", authenticateToken, updateStock);
router.delete("/stock/:id", authenticateToken, deleteStock);

export default router;