import HomePageModel, { IHomePage } from '../models/homePage';

export default class HomePageService {
  static async getHomePages(): Promise<IHomePage[]> {
    try {
      return await HomePageModel.find();
    } catch (error) {
      throw new Error('Error fetching home page data');
    }
  }

  static async createHomePage(data: IHomePage): Promise<IHomePage> {
    try {
      if (data.isActive) {
        // Deactivate all other home pages
        await HomePageModel.updateMany({}, { isActive: false });
      }
      const homePage = new HomePageModel(data);
      await homePage.save();
      return homePage;
    } catch (error: any) {
      throw new Error('Error creating home page: ' + error.message);
    }
  }

  static async getHomePageById(id: string): Promise<IHomePage | null> {
    try {
      return await HomePageModel.findById(id);
    } catch (error) {
      throw new Error('Error fetching home page data');
    }
  }

  static async updateHomePage(id: string, data: Partial<IHomePage>): Promise<IHomePage | null> {
    try {
      if (data.isActive) {
        // Deactivate all other home pages
        await HomePageModel.updateMany({ _id: { $ne: id } }, { isActive: false });
      }
      const updatedHomePage = await HomePageModel.findByIdAndUpdate(id, data, { new: true });
      if (!updatedHomePage) {
        throw new Error('Home page not found');
      }
      return updatedHomePage;
    } catch (error: any) {
      throw new Error('Error updating home page: ' + error.message);
    }
  }

  static async deleteHomePage(id: string): Promise<void> {
    try {
      const homePage = await HomePageModel.findById(id);
      if (!homePage) {
        throw new Error('Home page not found');
      }
      if (homePage.isActive) {
        throw new Error('Cannot delete an active home page');
      }
      await HomePageModel.findByIdAndDelete(id);
    } catch (error: any) {
      throw new Error('Error deleting home page: ' + error.message);
    }
  }
}
