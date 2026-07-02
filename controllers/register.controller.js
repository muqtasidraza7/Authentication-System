import { User } from "../models/User.model.js";
import { userSchema } from "../schemas/user.schema.js";
import { errorResponse, successResponse } from "../utils/response.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res, next) => {
  try {
    const data = userSchema.safeParse(req.body);

    if (!data.success) {
      return errorResponse(res, 400, "User details entered is not valid");
    }
    const { name, age, email, password, role } = data.data;

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      age,
      email,
      password: hashPassword,
      role,
    });
    await newUser.save();

    return successResponse(res, 201, {
      name,
      age,
      email,
      role,
    });
  } catch (error) {
    return errorResponse(res, 500, "internal server error");
  }
};
