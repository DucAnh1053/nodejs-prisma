import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../error_handler";
import { addAddress, changeUserRole, deleteAddress, deleteUser, getUserById, listAddress, listUsers, updateUser } from "../controllers/users";

const usersRouter:Router = Router();

usersRouter.post('/address', [authMiddleware], errorHandler(addAddress));
usersRouter.delete('/address/:id', [authMiddleware], errorHandler(deleteAddress));
usersRouter.get('/address', [authMiddleware], errorHandler(listAddress));
usersRouter.put('/:id', [authMiddleware], errorHandler(updateUser));
usersRouter.put('/:id/role', [authMiddleware, adminMiddleware], errorHandler(changeUserRole));
usersRouter.get('/', [authMiddleware, adminMiddleware], errorHandler(listUsers));
usersRouter.get('/:id', [authMiddleware, adminMiddleware], errorHandler(getUserById));
usersRouter.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteUser));

export default usersRouter;