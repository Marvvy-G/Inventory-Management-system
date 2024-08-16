import {Router} from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';

import {getWarehouses, getWarehouseById, createWarehouse, updateWarehouse, deleteWarehouse} from '../controllers/warehouseController';

const router = Router();

router.get("/warehouse",authenticateToken, getWarehouses);
router.get("/warehouse/:id",authenticateToken, getWarehouseById);
router.post("/warehouse",authenticateToken, createWarehouse);
router.put("/warehouse/:id",authenticateToken, updateWarehouse);
router.delete("/warehouse/:id",authenticateToken, deleteWarehouse);

export default router;
