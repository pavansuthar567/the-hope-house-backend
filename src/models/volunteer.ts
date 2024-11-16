import mongoose, { Schema, Document, Model } from 'mongoose';

interface IAddress {
  city: string;
  state: string;
}

export interface IVolunteer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: IAddress;
  gender: 'Male' | 'Female' | 'Other';
  skills: string[];
  availability: 'Full-time' | 'Part-time' | 'Weekends';
  experience?: string;
}

const addressSchema = new Schema<IAddress>({
  city: { type: String, required: true },
  state: { type: String, required: true },
});

const volunteerSchema = new Schema<IVolunteer>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: addressSchema, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    skills: { type: [String], required: true },
    availability: { type: String, enum: ['Full-time', 'Part-time', 'Weekends'], required: true },
    experience: { type: String },
  },
  { versionKey: false },
);

// Export the model
const VolunteerModel: Model<IVolunteer> = mongoose.model<IVolunteer>('volunteers', volunteerSchema);
export default VolunteerModel;
