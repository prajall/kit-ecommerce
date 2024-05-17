import mongoose from "mongoose";

export const connectDB = async () => {
  const connectionInstance = mongoose
    .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kly")
    .catch((err) => {
      console.log("Database connection error");
    });
  console.log("Database connected successfully");
};
