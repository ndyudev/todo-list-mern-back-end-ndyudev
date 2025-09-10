import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION);
    
    console.log("Connect database succecfuly!");
  } catch (error) {
    console.error("Error connecting database...:", error);
    process.exit(1); // exit with error
  }
};
