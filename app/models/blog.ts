import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IComment {
  user: string;
  message: string;
  createdAt: Date;
}

export interface IBlog extends Document {
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  publishedDate: Date;
  status: 'Draft' | 'Published';
  featuredImage?: string; // Optional
  comments: IComment[];
  likes: number;
  views: number;
}

const commentSchema = new Schema<IComment>({
  user: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  publishedDate: { type: Date, required: true },
  status: { type: String, enum: ['Draft', 'Published'], required: true },
  featuredImage: { type: String }, // Optional
  comments: { type: [commentSchema], default: [] },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
});

const BlogModel: Model<IBlog> = mongoose.model<IBlog>('blog', blogSchema);
export default BlogModel;
