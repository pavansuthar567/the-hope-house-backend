import mongoose, { Schema, model, Document } from 'mongoose';
import { IEvent } from './event';

export interface IGallery extends Document {
  imageUrl: string;
  caption?: string;
  eventId?: IEvent['_id'];
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
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'events',
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

GallerySchema.pre('find', function () {
  this.populate('eventId');
});

const GalleryModel = model<IGallery>('Gallery', GallerySchema);

export default GalleryModel;
