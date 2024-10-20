import HomePageModel, { IHomePage } from '../models/homePage';

export default class HomePageService {
  static async getHomePage(): Promise<IHomePage | null> {
    try {
      return await HomePageModel.findOne();
    } catch (error) {
      throw new Error('Error fetching home page data');
    }
  }

  static async createHomePage(data: IHomePage): Promise<IHomePage> {
    try {
      const homePage = new HomePageModel(data);
      await homePage.save();
      return homePage;
    } catch (error: any) {
      throw new Error('Error creating home page: ' + error.message);
    }
  }

  static async updateHomePage(id: string, data: Partial<IHomePage>): Promise<IHomePage | null> {
    try {
      const updatedHomePage = await HomePageModel.findByIdAndUpdate(id, data, { new: true });
      if (!updatedHomePage) {
        throw new Error('Home page not found');
      }
      return updatedHomePage;
    } catch (error: any) {
      throw new Error('Error updating home page: ' + error.message);
    }
  }
}
