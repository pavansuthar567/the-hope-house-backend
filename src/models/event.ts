import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from './user';
// import { IUser } from './User';  // Assuming User model exists

interface ILocation {
  venue: string;
  address: string;
  city: string;
  state: string;
}

export interface IEvent extends Document {
  eventName: string;
  description: string;
  organizer: IUser | string; // Reference to User model or Organization
  location: ILocation;
  startDate: Date;
  endDate: Date;
  capacity: number;
  participantsRegistered: number;
  eventType: 'In-Person' | 'Virtual';
  registrationLink?: string;
  featuredImage?: string[];
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

const locationSchema = new Schema<ILocation>({
  venue: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
});

const eventSchema = new Schema<IEvent>({
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: locationSchema, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  capacity: { type: Number, required: true },
  participantsRegistered: { type: Number, default: 0 },
  eventType: { type: String, enum: ['In-Person', 'Virtual'], required: true },
  registrationLink: { type: String },
  featuredImage: { type: [String] },
  status: { type: String, enum: ['Upcoming', 'Completed', 'Cancelled'], required: true },
});

// Export the model
const EventModel: Model<IEvent> = mongoose.model<IEvent>('events', eventSchema);
export default EventModel;
