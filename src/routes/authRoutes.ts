import {Router} from 'express';
import {login, createUser } from '../controllers/userController';

const router = Router();

router.post("/register", createUser);
router.post("/login", login);

export default router;
