import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Database is connected");
  } catch (err) {
    console.log(err || "failed to connect db ");
  }
};
export default connectDB;
