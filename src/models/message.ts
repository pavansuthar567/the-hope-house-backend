import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMessage extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true, length: 10 },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const MessageModel: Model<IMessage> = mongoose.model<IMessage>('Message', messageSchema);
export default MessageModel;
