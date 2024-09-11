import { Request, Response } from "express";
import { ChangeQuantitySchema, CreateCartSchema } from "../schema/cart";
import { NotFoundException } from "../exceptions/not_found";
import { ErrorCode } from "../exceptions/root";
import { Product } from "@prisma/client";
import { prismaClient } from "..";
import { UnauthorizedException } from "../exceptions/unauthorized";

export const addItemToCart = async (req: Request, res: Response) => {
    // Check for the existence of the same product in user's cart and alter the quantity as needed
    const validateData = CreateCartSchema.parse(req.body);
    let product: Product;
    try {
        product = await prismaClient.product.findFirstOrThrow({
            where: {
                id: validateData.productId,
            },
        });
        const existingCartItem = await prismaClient.cartItem.findFirst({
            where: {
                userId: req.user.id,
                productId: product.id,
            },
        });
        let cart;
        if (existingCartItem) {
            cart = await prismaClient.cartItem.update({
                where: {
                    id: existingCartItem.id,
                },
                data: {
                    quantity: existingCartItem.quantity + validateData.quantity,
                },
            });
        } else {
            cart = await prismaClient.cartItem.create({
                data: {
                    userId: req.user.id,
                    productId: product.id,
                    quantity: validateData.quantity,
                },
            });
        }
        res.json(cart);
    } catch (error) {
        throw new NotFoundException(
            "Product not found",
            ErrorCode.PRODUCT_NOT_FOUND
        );
    }
};

export const deleteItemFromCart = async (req: Request, res: Response) => {
    // Check if user is deleting his own cart item
    const cartItem = await prismaClient.cartItem.findFirst({
        where: {
            id: +req.params.id,
        },
    });

    if (!cartItem) {
        throw new NotFoundException(
            "Cart item not found",
            ErrorCode.CART_ITEM_NOT_FOUND
        );
    }

    if (cartItem.userId !== req.user.id) {
        throw new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED);
    }

    await prismaClient.cartItem.delete({
        where: {
            id: +req.params.id,
        },
    });
    res.json({ success: true });
};

export const changeQuantity = async (req: Request, res: Response) => {
    // Check if user is updating his own cart item
    const cartItem = await prismaClient.cartItem.findFirst({
        where: {
            id: +req.params.id,
        },
    });

    if (!cartItem) {
        throw new NotFoundException(
            "Cart item not found",
            ErrorCode.CART_ITEM_NOT_FOUND
        );
    }

    if (cartItem.userId !== req.user.id) {
        throw new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED);
    }

    const validateData = ChangeQuantitySchema.parse(req.body);
    const updatedCart = await prismaClient.cartItem.update({
        where: {
            id: +req.params.id,
        },
        data: {
            quantity: validateData.quantity,
        },
    });

    res.json(updatedCart);
};

export const getCart = async (req: Request, res: Response) => {
    const cart = await prismaClient.cartItem.findMany({
        where: {
            userId: req.user.id,
        },
        include: {
            product: true, // include the product details
        },
    });
    res.json(cart);
};
