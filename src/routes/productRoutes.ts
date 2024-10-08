import {Router} from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import {getProducts, getProductById, createProduct, updateProduct, deleteProduct} from '../controllers/productController';

const router = Router();

router.get("/products", authenticateToken, getProducts);
router.get("/products/:id", authenticateToken, getProductById);
router.post("/products", authenticateToken, createProduct);
router.put("/products/:id", authenticateToken, updateProduct);
router.delete("/products/:id", authenticateToken, deleteProduct);

export default router;
