import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the interface for a User document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Create the schema for User
const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Export the model
const UserModel: Model<IUser> = mongoose.model<IUser>('users', userSchema);
export default UserModel;
