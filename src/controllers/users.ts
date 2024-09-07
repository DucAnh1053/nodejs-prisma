import { Request, Response } from "express";
import { AddressSchema, UpdateUserSchema } from "../schema/users";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not_found";
import { ErrorCode } from "../exceptions/root";
import { Address } from "@prisma/client";
import { BadRequestsException } from "../exceptions/bad_requests";

export const addAddress = async (req: Request, res: Response) => {
    AddressSchema.parse(req.body);

    const address = await prismaClient.address.create({
        data: {
            ...req.body,
            userId: req.user.id
        }
    });
    res.json(address);
}

export const deleteAddress = async (req: Request, res: Response) => {
    try {
        await prismaClient.address.delete({
            where: {
                id: +req.params.id
            }
        });
        res.json({ success: true });
    } catch (error) {
        throw new NotFoundException("Address not found", ErrorCode.ADDRESS_NOT_FOUND);
    }
}

export const listAddress = async (req: Request, res: Response) => {
    const addresses = await prismaClient.address.findMany({
        where: {
            userId: req.user.id
        }
    });
    res.json(addresses);
}

export const updateUser = async (req: Request, res: Response) => {
    const validateData = UpdateUserSchema.parse(req.body);
    let shippingAddress: Address
    let billingAddress: Address
    if (validateData.defaultShippingAddress) {
        try {
            shippingAddress = await prismaClient.address.findFirstOrThrow({
                where: {
                    id: validateData.defaultShippingAddress!,
                }
            });

        } catch (error) {
            throw new NotFoundException("Address not found", ErrorCode.ADDRESS_NOT_FOUND);
        }
        if (shippingAddress.userId !== req.user.id) {
            throw new BadRequestsException("Address does not belong to user", ErrorCode.ADDRESS_DOES_NOT_BELONG);
        }
    }
    if (validateData.defaultBillingAddress) {
        try {
            billingAddress = await prismaClient.address.findFirstOrThrow({
                where: {
                    id: validateData.defaultBillingAddress!,
                }
            });

        } catch (error) {
            throw new NotFoundException("Address not found", ErrorCode.ADDRESS_NOT_FOUND);
        }
        if (billingAddress.userId !== req.user.id) {
            throw new BadRequestsException("Address does not belong to user", ErrorCode.ADDRESS_DOES_NOT_BELONG);
        }
    }

    const updateUser = await prismaClient.user.update({
        where: {
            id: req.user.id
        },
        data: validateData
    });

    res.json(updateUser);
}