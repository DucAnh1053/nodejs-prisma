import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../error_handler";
import { addAddress, deleteAddress, listAddress, updateUser } from "../controllers/users";

const usersRouter:Router = Router();

usersRouter.post('/address', [authMiddleware], errorHandler(addAddress));
usersRouter.delete('/address/:id', [authMiddleware], errorHandler(deleteAddress));
usersRouter.get('/address', [authMiddleware], errorHandler(listAddress));
usersRouter.put('/', [authMiddleware], errorHandler(updateUser));

export default usersRouter;