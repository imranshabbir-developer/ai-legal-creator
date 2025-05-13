import mongoose from 'mongoose';
import colors from 'colors'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected`.bgBlue);
  } catch (error) {
    console.error(`MongoDB connection failed`.bgRed);
    process.exit(1);
  }
};

export default connectDB;
