import AncillaryPageModel, { IAncillaryPage } from '../models/ancillaryPage';

export default class AncillaryPageService {
  static async getAncillaryPages(): Promise<IAncillaryPage[]> {
    try {
      return await AncillaryPageModel.find();
    } catch (error) {
      throw new Error('Error fetching pages');
    }
  }

  static async createAncillaryPage(data: IAncillaryPage): Promise<IAncillaryPage> {
    try {
      const page = new AncillaryPageModel(data);
      await page.save();
      return page;
    } catch (error: any) {
      throw new Error('Error creating page: ' + error.message);
    }
  }

  static async getAncillaryPageById(id: string): Promise<IAncillaryPage | null> {
    try {
      return await AncillaryPageModel.findById(id);
    } catch (error) {
      throw new Error('Error fetching page');
    }
  }

  static async updateAncillaryPage(id: string, data: Partial<IAncillaryPage>): Promise<IAncillaryPage | null> {
    try {
      const updatedPage = await AncillaryPageModel.findByIdAndUpdate(id, data, { new: true });
      if (!updatedPage) {
        throw new Error('Page not found');
      }
      return updatedPage;
    } catch (error: any) {
      throw new Error('Error updating page: ' + error.message);
    }
  }

  static async deleteAncillaryPage(id: string): Promise<void> {
    try {
      await AncillaryPageModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting page');
    }
  }
}
