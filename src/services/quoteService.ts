import QuoteModel, { IQuote } from '../models/quote';

export default class QuoteService {
  static async getQuotes(): Promise<IQuote[]> {
    try {
      return await QuoteModel.find();
    } catch (error) {
      throw new Error('Error fetching quotes');
    }
  }

  static async createQuote(data: IQuote): Promise<IQuote> {
    try {
      const quote = new QuoteModel(data);
      await quote.save();
      return quote;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error('Duplicate key error: ' + JSON.stringify(error.keyValue));
      }
      throw new Error('Error creating quote: ' + error.message);
    }
  }

  static async getQuoteById(id: string): Promise<IQuote | null> {
    try {
      return await QuoteModel.findById(id);
    } catch (error) {
      throw new Error('Error fetching quote');
    }
  }

  static async updateQuote(id: string, data: Partial<IQuote>): Promise<IQuote | null> {
    try {
      const updatedQuote = await QuoteModel.findByIdAndUpdate(id, data, { new: true });
      if (!updatedQuote) {
        throw new Error('Quote not found');
      }
      return updatedQuote;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error('Duplicate key error: ' + JSON.stringify(error.keyValue));
      }
      throw new Error('Error updating quote: ' + error.message);
    }
  }

  static async deleteQuote(id: string): Promise<void> {
    try {
      await QuoteModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting quote');
    }
  }
}
