import * as z from 'zod';

export const UserSchema = z.object({
    email: z.string().optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    password: z.string().optional(),
    type: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    statusCode: z.number().optional(),
    body: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;