import { errorResponse } from "../utils/response.js"

export const checkRoles = (...allowedRoles) => {
    return (req, res, next) => {

        if (!req.user) {
            return errorResponse(res, 401, 'Not authenticated')
        }

        if (!allowedRoles.includes(req.user.role)) {
            return errorResponse(res, 403, 'You do not have permission')
        }

        next()
    }
}