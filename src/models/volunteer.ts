import mongoose, { Schema, Document, Model } from 'mongoose';

interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface IEmergencyContact {
  name: string;
  phoneNumber: string;
  relation: string;
}

export interface IVolunteer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: IAddress;
  dateOfBirth: Date;
  gender: 'Male' | 'Female' | 'Other';
  skills: string[];
  availability: 'Full-time' | 'Part-time' | 'Weekends';
  joinedDate: Date;
  experience?: string;
  emergencyContact: IEmergencyContact;
}

const addressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
});

const emergencyContactSchema = new Schema<IEmergencyContact>({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  relation: { type: String, required: true },
});

const volunteerSchema = new Schema<IVolunteer>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    address: { type: addressSchema, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    skills: { type: [String], required: true },
    availability: { type: String, enum: ['Full-time', 'Part-time', 'Weekends'], required: true },
    joinedDate: { type: Date, default: Date.now },
    experience: { type: String },
    emergencyContact: { type: emergencyContactSchema, required: true },
  },
  { versionKey: false },
);

// Export the model
const VolunteerModel: Model<IVolunteer> = mongoose.model<IVolunteer>('volunteers', volunteerSchema);
export default VolunteerModel;
