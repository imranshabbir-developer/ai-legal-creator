import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'lawyer', 'client'], default: 'client' },
  profilePic: { type: String }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
