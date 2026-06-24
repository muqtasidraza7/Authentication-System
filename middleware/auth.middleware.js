import { errorResponse } from "../utils/response.js"
import jwt from "jsonwebtoken"

export const protect = (req, res, next) => {
    try {
        const header = req.headers.authorization
        if (!header || !header.startsWith("Bearer ")) {
            errorResponse(res, 401, 'No token provided')
        }

        const token = header.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decode
        next()

    } catch (error) {
        return errorResponse(res, 401, 'Invalid or expired token')
    }

}