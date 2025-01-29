import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullname: string;
  email: string;
  passwordHash: string;
  role: 'user' | 'admin'; 
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.model<IUser>('User', UserSchema);
export default User;

