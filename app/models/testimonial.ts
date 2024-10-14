import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  designation?: string; // Optional: Role or Position of the person giving the testimonial
  message: string;
  image?: string; // Optional: Image URL of the person
  rating: number; // Rating out of 5
  createdAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  designation: { type: String },
  message: { type: String, required: true },
  image: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

const TestimonialModel: Model<ITestimonial> = mongoose.model<ITestimonial>('testimonial', testimonialSchema);
export default TestimonialModel;
