import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFaq extends Document {
  question: string;
  answer: string;
  category?: string; // e.g., 'General', 'Volunteering', 'Donations'
  createdAt: Date;
}

const faqSchema = new Schema<IFaq>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, enum: ['General', 'Volunteering', 'Donations'], default: 'General' }, // Optional: Categorize FAQs
  createdAt: { type: Date, default: Date.now },
});

// Export the model
const FaqModel: Model<IFaq> = mongoose.model<IFaq>('faqs', faqSchema);
export default FaqModel;
