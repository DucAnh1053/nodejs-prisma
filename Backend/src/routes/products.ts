import { Router } from "express";
import { errorHandler } from "../error_handler";
import { createProduct, deleteProduct, getProductById, listProducts, searchProducts, updateProduct } from "../controllers/products";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const productsRouter: Router = Router();

productsRouter.post('/', [authMiddleware, adminMiddleware], errorHandler(createProduct));
productsRouter.put('/:id', [authMiddleware, adminMiddleware], errorHandler(updateProduct));
productsRouter.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteProduct));
productsRouter.get('/', [authMiddleware], errorHandler(listProducts));
productsRouter.get('/search', [authMiddleware], errorHandler(searchProducts));
productsRouter.get('/:id', [authMiddleware], errorHandler(getProductById));

// /search?q=""

export default productsRouter;