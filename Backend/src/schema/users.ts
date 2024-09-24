import { z } from "zod";

export const SignUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum([
        "ADMIN",
        "LAB_TECHNICIAN",
        "QUALITY_MANAGER",
        "HOSPITAL_TECHNICIAN",
    ]),
});

export const AddressSchema = z.object({
    lineOne: z.string(),
    lineTwo: z.string().nullable(),
    pincode: z.string().length(6),
    country: z.string(),
    city: z.string(),
});

export const UpdateUserSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    role: z.enum([
        "ADMIN",
        "LAB_TECHNICIAN",
        "QUALITY_MANAGER",
        "HOSPITAL_TECHNICIAN",
    ]),
    defaultShippingAddress: z.number().optional(),
    defaultBillingAddress: z.number().optional(),
});
