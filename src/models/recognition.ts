import { Schema, model, Document } from 'mongoose';

export interface IRecognition extends Document {
  title: string;
  type: string;
  description: string;
  date: Date;
  imageUrl?: string;
  createdAt?: Date;
  createdBy?: string;
}

const RecognitionSchema = new Schema<IRecognition>({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 100,
  },
  date: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
  },
});

const RecognitionModel = model<IRecognition>('Recognition', RecognitionSchema);
export default RecognitionModel;
