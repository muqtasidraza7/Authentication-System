import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true, min: [0, 'Age cant be negative'] },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["ADMIN", "PM", "TEAM", "CLIENT"]
    }
})

export const User = mongoose.model("User", userSchema)