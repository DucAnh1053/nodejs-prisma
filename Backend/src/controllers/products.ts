import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not_found";
import { ErrorCode } from "../exceptions/root";

export const createProduct = async (req: Request, res: Response) => {
    // ['tea', 'india'] => 'tea,india'

    // create a validator for this request
    const product = await prismaClient.product.create({
        data: { ...req.body, tags: req.body.tags.join(",") },
    });

    res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body;
        if (product.tags) {
            product.tags = product.tags.join(",");
        }
        const updatedProduct = await prismaClient.product.update({
            where: {
                id: +req.params.id,
            },
            data: product,
        });
        res.json(updatedProduct);
    } catch (error) {
        throw new NotFoundException(
            "Product not found",
            ErrorCode.PRODUCT_NOT_FOUND
        );
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await prismaClient.product.delete({
            where: {
                id: +req.params.id,
            },
        });
        res.json(deletedProduct);
    } catch (error) {
        throw new NotFoundException(
            "Product not found",
            ErrorCode.PRODUCT_NOT_FOUND
        );
    }
};

export const listProducts = async (req: Request, res: Response) => {
    const count = await prismaClient.product.count();
    const products = await prismaClient.product.findMany({
        skip: +(req.query.skip || 0),
        take: 5,
    });
    res.json({ count, data: products });
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await prismaClient.product.findFirst({
            where: {
                id: +req.params.id,
            },
        });
        res.json(product);
    } catch (error) {
        throw new NotFoundException(
            "Product not found",
            ErrorCode.PRODUCT_NOT_FOUND
        );
    }
};

export const searchProducts = async (req: Request, res: Response) => {

    // implement pagination here 
    
    const products = await prismaClient.product.findMany({
        where: {
            name: {
                search: req.query.q?.toString(),
            },
            description: {
                search: req.query.q?.toString(),
            },
            tags: {
                search: req.query.q?.toString(),
            },
        },
        skip: +(req.query.skip || 0),
        take: 5,
    });
    res.json(products);
};
