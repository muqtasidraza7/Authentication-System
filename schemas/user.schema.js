import { z } from "zod"

export const userSchema = z.object({
    name: z.string().min(3, { message: "Name should be of atleast 3 letters" }),
    age: z.number().positive(),
    email: z.string().email(),
    password: z.string().min(5, { message: "password should be of atleast 5 letters" }),
    role: z.enum(["ADMIN", "PM", "TEAM", "CLIENT"])
})