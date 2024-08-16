import {Router} from 'express';
import {getWarehouses, getWarehouseById, createWarehouse, updateWarehouse, deleteWarehouse} from '../controllers/warehouseController';

const router = Router();

router.get("/warehouse", getWarehouses);
router.get("/warehouse/:id", getWarehouseById);
router.post("/warehouse", createWarehouse);
router.put("/warehouse/:id", updateWarehouse);
router.delete("/warehouse/:id", deleteWarehouse);

export default router;
