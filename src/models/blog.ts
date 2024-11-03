import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from './user';

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
  featuredImage?: string;
  comments: IComment[];
  likes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: IUser['_id'];
  updatedBy: IUser['_id'];
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
  category: {
    type: String,
    enum: [
      'Education',
      'Healthcare',
      'Environment',
      'Women Empowerment',
      'Child Welfare',
      'Community Development',
      'Disaster Relief',
      'Human Rights',
      'Animal Welfare',
      'Sustainability',
    ],
    required: true,
  },
  tags: { type: [String], required: true },
  publishedDate: { type: Date },
  status: { type: String, enum: ['Draft', 'Published'], required: true },
  featuredImage: { type: String }, // Optional
  comments: { type: [commentSchema], default: [] },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'users', required: true },
});

blogSchema.pre('find', function () {
  this.populate('createdBy updatedBy');
});

const BlogModel: Model<IBlog> = mongoose.model<IBlog>('blog', blogSchema);
export default BlogModel;
