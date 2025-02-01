import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from './user'; // Assuming you have an IUser interface

// Define the interface for TradingViewAlert
export interface ITradingViewAlert extends Document {
  rawData: object; // Stores the entire JSON from TradingView
  timestamp: Date; // Timestamp when the alert was received
}

// Define the schema
const tradingViewAlertSchema = new Schema<ITradingViewAlert>(
  {
    rawData: { type: Object, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }, // Automatically adds `createdAt` and `updatedAt` fields
);

// Create the model
const TradingViewAlertModel: Model<ITradingViewAlert> = mongoose.model<ITradingViewAlert>(
  'TradingViewAlert',
  tradingViewAlertSchema,
);

export default TradingViewAlertModel;
