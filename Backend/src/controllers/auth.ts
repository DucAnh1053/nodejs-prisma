import {NextFunction, Request, Response} from 'express';
import { prismaClient } from '../index';
import {hashSync, compareSync} from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';
import { BadRequestsException } from '../exceptions/bad_requests';
import { ErrorCode } from '../exceptions/root';
import { UnprocessableEntity } from '../exceptions/validation';
import { SignUpSchema } from '../schema/users';
import { NotFoundException } from '../exceptions/not_found';

export const signup = async (req:Request, res:Response, next: NextFunction) => {
    SignUpSchema.parse(req.body); //validation trước
    const {email, password, name, role} = req.body;

    let user = await prismaClient.user.findFirst({where: {email}});
    if (user) {
        throw new BadRequestsException('User already exists', ErrorCode.USER_ALREADY_EXISTS);
    }

    user = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10),
            role
        }
    });

    res.json(user);
}

export const login = async (req:Request, res:Response) => {
    const {email, password} = req.body;

    let user = await prismaClient.user.findFirst({where: {
        email,
        isDeleted: false,
    }});
    if (!user) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    }

    if(!compareSync(password, user.password)) {
        throw new BadRequestsException("Incorrect password", ErrorCode.INCORRECT_PASSWORD);
    }
    const token = jwt.sign({
        userId: user.id
    }, JWT_SECRET)

    await prismaClient.userInteraction.create({
        data: {
            userId: user.id,
            type: 'LOGIN',
            metadata: {
                device: req.headers['user-agent'] || 'Unknown'
            }
        }
    })

    res.json({user, token});
}

// /me -> return the logged in user
export const me = async (req:Request, res:Response) => {
    res.json(req.user);
}