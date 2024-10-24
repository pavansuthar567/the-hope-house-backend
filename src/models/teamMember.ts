import mongoose, { Schema, Document, Model } from 'mongoose';

interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ISocialMediaLinks {
  linkedIn?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

export interface ITeamMember extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: IAddress;
  role: string; // e.g. 'Manager', 'Coordinator'
  bio: string;
  dateOfJoining: Date;
  skills: string[];
  socialMediaLinks: ISocialMediaLinks;
  profilePictureUrl?: string;
}

const addressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
});

const socialMediaLinksSchema = new Schema<ISocialMediaLinks>({
  linkedIn: { type: String },
  twitter: { type: String },
  facebook: { type: String },
  instagram: { type: String },
});

const teamMemberSchema = new Schema<ITeamMember>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  address: { type: addressSchema, required: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  dateOfJoining: { type: Date, default: Date.now },
  skills: { type: [String], required: true },
  socialMediaLinks: { type: socialMediaLinksSchema },
  profilePictureUrl: { type: String },
});

// Export the model
const TeamMemberModel: Model<ITeamMember> = mongoose.model<ITeamMember>('team_members', teamMemberSchema);
export default TeamMemberModel;
