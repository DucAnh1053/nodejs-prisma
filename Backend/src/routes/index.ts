import { Router } from "express";
import authRoutes from "./auth";
import productsRouter from "./products";
import usersRouter from "./users";
import cartRoutes from "./cart";
import orderRoutes from "./orders";

const rootRouter:Router = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/products', productsRouter);
rootRouter.use('/users', usersRouter);
rootRouter.use('/cart', cartRoutes);
rootRouter.use('/orders', orderRoutes)

export default rootRouter;

/*  1. user management
        a. list users
        c. get user by id
        b. change user role
    2. order management
        a. list all orders (filter on status)
        b. change order status
        c. list all orders of given user
    3. products
        a. search api for products (for both users and admins) -> full text search   
*/