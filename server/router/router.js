import Router from "express";
import UserController from '../controllers/user-controller.js';
import authMiddleware from "../middlewares/auth-middleware.js";


const router = new Router;

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleware, UserController.getUsers);

export default router;