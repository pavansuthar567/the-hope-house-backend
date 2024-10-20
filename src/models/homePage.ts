import mongoose, { Document, Schema } from 'mongoose';

export interface IHomePage extends Document {
  logo: string;
  quote: string;
  heroSectionVideo: string;
  statistics: string; // Consider using a more structured format for stats if necessary
  whoWeAre: string;
  whatWeDo: string;
  createdAt?: Date;
  createdBy?: string;
}

const HomePageSchema: Schema = new Schema({
  logo: { type: String, required: true },
  quote: { type: String, required: true },
  heroSectionVideo: { type: String, required: true },
  statistics: { type: String, required: true }, // Or a structured object
  whoWeAre: { type: String, required: true },
  whatWeDo: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, optional: true },
});

const HomePageModel = mongoose.model<IHomePage>('HomePage', HomePageSchema);
export default HomePageModel;
