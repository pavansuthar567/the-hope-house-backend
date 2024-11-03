import { Request, Response } from 'express';
import HomePageService from '../../services/homePageService';
import { createError, createResponse } from '../../utils/helpers';
import mongoose from 'mongoose';

export default class HomePageController {
  static async getHomePages(req: Request, res: Response) {
    try {
      const homePages = await HomePageService.getHomePages();
      return createResponse(res, 'ok', 'Home page data retrieved successfully.', homePages);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async createHomePage(req: Request, res: Response) {
    try {
      const user = new mongoose.Types.ObjectId('672335cb8b57a8954d79d1c2');
      const payload = { ...req.body, createdBy: user, updatedBy: user };

      const homePage = await HomePageService.createHomePage(payload);
      return createResponse(res, 'ok', 'Home page created successfully.', homePage, {}, 201);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async getHomePageById(req: Request, res: Response) {
    try {
      const homePage = await HomePageService.getHomePageById(req.params.id);
      return homePage
        ? createResponse(res, 'ok', 'Home page data retrieved successfully.', homePage)
        : createError(res, 'Home page not found', {}, 404);
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

  static async deleteHomePage(req: Request, res: Response) {
    try {
      await HomePageService.deleteHomePage(req.params.id);
      return createResponse(res, 'ok', 'Home page deleted successfully.', {});
    } catch (error) {
      return createError(res, error);
    }
  }
}
