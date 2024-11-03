import mongoose, { Document, Schema, Model } from 'mongoose';
import { IUser } from './user';

export interface IHomePage extends Document {
  logo: string;
  quote: string;
  heroSectionVideo: string;
  whoWeAre: string;
  whatWeDo: string;
  termsOfUse: string;
  privacyPolicy: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: IUser['_id'];
  updatedBy: IUser['_id'];
}

const HomePageSchema: Schema<IHomePage> = new Schema({
  logo: { type: String, required: true },
  quote: { type: String, required: true },
  heroSectionVideo: { type: String, required: true },
  whoWeAre: { type: String, required: true },
  whatWeDo: { type: String, required: true },
  termsOfUse: { type: String, required: true },
  privacyPolicy: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'users', required: true },
});

// Auto-populate createdBy and updatedBy fields during queries
HomePageSchema.pre('find', function () {
  this.populate('createdBy updatedBy');
});

const HomePageModel: Model<IHomePage> = mongoose.model<IHomePage>('HomePage', HomePageSchema);
export default HomePageModel;
