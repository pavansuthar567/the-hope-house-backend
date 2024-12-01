import mongoose, { Schema, Document, Model } from 'mongoose';

interface IAddress {
  street?: string; // Made optional
  city: string;
  state: string;
  zipCode?: string; // Made optional
}

interface ISocialMediaLinks {
  linkedIn?: string;
  twitter?: string;
  instagram?: string;
}

export interface ITeamMember extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: IAddress;
  role: string;
  bio: string;
  dateOfJoining: Date;
  socialMediaLinks?: ISocialMediaLinks;
  profilePictureUrl?: string;
}

const addressSchema = new Schema<IAddress>({
  street: { type: String }, // Made optional
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String }, // Made optional
});

const socialMediaLinksSchema = new Schema<ISocialMediaLinks>({
  linkedIn: { type: String },
  twitter: { type: String },
  instagram: { type: String },
});

const teamMemberSchema = new Schema<ITeamMember>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true },
  phoneNumber: { type: String, required: true },
  address: { type: addressSchema, required: true },
  role: { type: String, required: true },
  bio: { type: String },
  dateOfJoining: { type: Date, default: Date.now },
  socialMediaLinks: { type: socialMediaLinksSchema, required: false },
  profilePictureUrl: { type: String },
});

// Export the model
const TeamMemberModel: Model<ITeamMember> = mongoose.model<ITeamMember>('team_members', teamMemberSchema);
export default TeamMemberModel;
