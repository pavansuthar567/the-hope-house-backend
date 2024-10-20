import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuote extends Document {
  text: string;
  author: string;
  source?: string;
  category?: string;
  createdAt: Date;
  createdBy?: string;
}

const quoteSchema = new Schema<IQuote>({
  text: { type: String, required: true },
  author: { type: String, required: true },
  source: { type: String },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String },
});

const QuoteModel: Model<IQuote> = mongoose.model<IQuote>('quotes', quoteSchema);
export default QuoteModel;
