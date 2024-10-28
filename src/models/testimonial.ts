import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from './user';

export interface ITestimonial extends Document {
  name: string;
  designation?: string; // Optional: Role or Position of the person giving the testimonial
  message: string;
  image?: string; // Optional: Image URL of the person
  createdAt: Date;
  updatedAt: Date;
  createdBy: IUser['_id'];
  updatedBy: IUser['_id'];
}

const testimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  designation: { type: String },
  message: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'users', required: true },
});

testimonialSchema.pre('find', function () {
  this.populate('createdBy updatedBy');
});

const TestimonialModel: Model<ITestimonial> = mongoose.model<ITestimonial>('testimonial', testimonialSchema);
export default TestimonialModel;
