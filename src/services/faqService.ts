import FaqModel, { IFaq } from '../models/faq';

export default class FaqService {
  static async getFaqs(): Promise<IFaq[]> {
    try {
      return await FaqModel.find();
    } catch (error) {
      throw new Error('Error fetching FAQs');
    }
  }

  static async createFaq(data: IFaq): Promise<IFaq> {
    try {
      const faq = new FaqModel(data);
      await faq.save();
      return faq;
    } catch (error) {
      throw new Error('Error creating FAQ');
    }
  }

  static async getFaqById(id: string): Promise<IFaq | null> {
    try {
      return await FaqModel.findById(id);
    } catch (error) {
      throw new Error('Error fetching FAQ');
    }
  }

  static async updateFaq(id: string, data: Partial<IFaq>): Promise<IFaq | null> {
    try {
      const updatedFaq = await FaqModel.findByIdAndUpdate(id, data, { new: true });
      if (!updatedFaq) {
        throw new Error('FAQ not found');
      }
      return updatedFaq;
    } catch (error) {
      throw new Error('Error updating FAQ');
    }
  }

  static async deleteFaq(id: string): Promise<void> {
    try {
      await FaqModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting FAQ');
    }
  }
}
