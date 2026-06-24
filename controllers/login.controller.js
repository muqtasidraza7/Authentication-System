import { User } from "../models/User.model.js"
import { loginSchema } from "../schemas/login.schema.js"
import { errorResponse, successResponse } from "../utils/response.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export const login = async (req, res, next) => {
    try {
        const data = loginSchema.safeParse(req.body)

        if (!data.success) {
            return errorResponse(res, 400, 'User login data is not valid')
        }

        const { email, password } = data.data

        const user = await User.findOne({ email })
        if (!user) {
            return errorResponse(res, 401, 'Invalid email or password')
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return errorResponse(res, 401, 'Invalid email or password')
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' }
        )
        return successResponse(res, 200, {
            token,
            id: user._id,
            name: user.name,
            age: user.age,
            email: user.email
        })

    } catch (error) {
        return errorResponse(res, 500, 'Internal server error')
    }
}