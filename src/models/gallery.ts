import { Schema, model, Document } from 'mongoose';

export interface IGallery extends Document {
  imageUrl: string;
  caption?: string;
  mission: string;
  createdAt?: Date;
  createdBy?: string;
}

const GallerySchema = new Schema<IGallery>({
  imageUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: false,
  },
  mission: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: false,
  },
});

const GalleryModel = model<IGallery>('Gallery', GallerySchema);

export default GalleryModel;
