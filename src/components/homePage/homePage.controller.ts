import { Request, Response } from 'express';
import HomePageService from '../../services/homePageService';
import { createError, createResponse } from '../../utils/helpers';

export default class HomePageController {
  static async getHomePage(req: Request, res: Response) {
    try {
      const homePage = await HomePageService.getHomePage();
      return createResponse(res, 'ok', 'Home page data retrieved successfully.', homePage || {});
    } catch (error) {
      return createError(res, error);
    }
  }

  static async createHomePage(req: Request, res: Response) {
    try {
      const homePage = await HomePageService.createHomePage(req.body);
      return createResponse(res, 'ok', 'Home page created successfully.', homePage, {}, 201);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async updateHomePage(req: Request, res: Response) {
    try {
      const homePage = await HomePageService.updateHomePage(req.params.id, req.body);
      if (!homePage) {
        return createError(res, new Error('Home page not found'), {}, 404);
      }
      return createResponse(res, 'ok', 'Home page updated successfully.', homePage);
    } catch (error) {
      return createError(res, error);
    }
  }
}
