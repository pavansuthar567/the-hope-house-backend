import { Schema, model, Document } from 'mongoose';

export interface IAncillaryPage extends Document {
  title: string;
  content: string;
  lastUpdated?: Date;
  createdBy?: string;
  status?: string;
  version?: string;
}

const AncillaryPageSchema = new Schema<IAncillaryPage>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'draft',
  },
  version: {
    type: String,
  },
});

const AncillaryPageModel = model<IAncillaryPage>('AncillaryPage', AncillaryPageSchema);
export default AncillaryPageModel;
