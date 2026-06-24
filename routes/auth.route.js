import express from "express"
import { registerUser } from "../controllers/register.controller.js"
import { login } from "../controllers/login.controller.js"
import { protect } from "../middleware/auth.middleware.js"
import { checkRoles } from "../middleware/role.middleware.js"

const authRouter = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', login)

authRouter.get('/me', protect, (req, res) => {
    res.json({
        success: true,
        message: "You are authenticated!",
        user: req.user
    })
})

authRouter.get('/admin', protect, checkRoles('ADMIN'), (req, res) => {
    res.json({
        success: true,
        message: "Welcome Admin!",
        user: req.user
    })
})

export default authRouter