import RecognitionModel, { IRecognition } from '../models/recognition';

export default class RecognitionService {
  static async getRecognitions(): Promise<IRecognition[]> {
    try {
      return await RecognitionModel.find();
    } catch (error) {
      throw new Error('Error fetching recognitions');
    }
  }

  static async createRecognition(data: IRecognition): Promise<IRecognition> {
    try {
      const recognition = new RecognitionModel(data);
      await recognition.save();
      return recognition;
    } catch (error: any) {
      throw new Error('Error creating recognition: ' + error.message);
    }
  }

  static async getRecognitionById(id: string): Promise<IRecognition | null> {
    try {
      return await RecognitionModel.findById(id);
    } catch (error) {
      throw new Error('Error fetching recognition');
    }
  }

  static async updateRecognition(id: string, data: Partial<IRecognition>): Promise<IRecognition | null> {
    try {
      const updatedRecognition = await RecognitionModel.findByIdAndUpdate(id, data, { new: true });
      if (!updatedRecognition) {
        throw new Error('Recognition not found');
      }
      return updatedRecognition;
    } catch (error: any) {
      throw new Error('Error updating recognition: ' + error.message);
    }
  }

  static async deleteRecognition(id: string): Promise<void> {
    try {
      await RecognitionModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting recognition');
    }
  }
}
