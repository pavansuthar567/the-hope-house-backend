import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from './user';

interface ILocation {
  venue: string;
  state: string;
}

export interface IEvent extends Document {
  eventName: string;
  description: string;
  organizer: IUser['_id'] | null;
  location: ILocation;
  startDate: Date;
  endDate: Date;
  capacity: number;
  participantsRegistered: number;
  eventType: string;
  content: string;
  registrationLink?: string;
  featuredImage?: string[];
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  createdAt: Date;
  updatedAt: Date;
  createdBy: IUser['_id'];
  updatedBy: IUser['_id'];
}

const locationSchema = new Schema<ILocation>({
  venue: { type: String, required: true },
  state: { type: String, required: true },
});

const eventSchema = new Schema<IEvent>({
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    default: null,
  },
  location: { type: locationSchema, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  capacity: { type: Number, required: true },
  participantsRegistered: { type: Number, default: 0 },
  eventType: {
    type: String,
    enum: [
      'Education',
      'Healthcare',
      'Environment',
      'Women Empowerment',
      'Child Welfare',
      'Community Development',
      'Disaster Relief',
      'Human Rights',
      'Animal Welfare',
      'Sustainability',
    ],
    required: true,
  },
  content: { type: String, required: true },
  registrationLink: { type: String },
  featuredImage: { type: [String] },
  status: { type: String, enum: ['Upcoming', 'Completed', 'Cancelled'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'users', required: true },
});

eventSchema.pre('find', function () {
  this.populate('organizer createdBy updatedBy');
});

// Export the model
const EventModel: Model<IEvent> = mongoose.model<IEvent>('events', eventSchema);
export default EventModel;
