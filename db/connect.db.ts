import mongoose from "mongoose";

export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI || "");
    if (mongoose.connection.readyState === 1) {
      console.log("DB is connected");
    }
  } catch (err) {
    console.error("Couldn't connect db");
  }
};
