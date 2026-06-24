import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGOOSE_URI;
    if (!uri) {
      console.log("Monngo DB URI is causing Isuue");
    }
    await mongoose.connect(uri);
    console.log("Database connected Successfully!");
  } catch (error) {
    console.log(`Error while connecting with DB ${error}`);
  }
};
