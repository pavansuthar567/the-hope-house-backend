import { Request, Response } from 'express';
import AncillaryPageService from '../../services/ancillaryPageService';
import { createError, createResponse } from '../../utils/helpers';

export default class AncillaryPageController {
  static async getAncillaryPages(req: Request, res: Response) {
    try {
      const pages = await AncillaryPageService.getAncillaryPages();
      return createResponse(res, 'ok', 'Pages retrieved successfully.', pages);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async createAncillaryPage(req: Request, res: Response) {
    try {
      const page = await AncillaryPageService.createAncillaryPage(req.body);
      return createResponse(res, 'ok', 'Page created successfully.', page, {}, 201);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async getAncillaryPageById(req: Request, res: Response) {
    try {
      const page = await AncillaryPageService.getAncillaryPageById(req.params.id);
      return page
        ? createResponse(res, 'ok', 'Page retrieved successfully.', page)
        : createError(res, 'Page not found', {}, 404);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async updateAncillaryPage(req: Request, res: Response) {
    try {
      const page = await AncillaryPageService.updateAncillaryPage(req.params.id, req.body);
      if (!page) {
        return createError(res, new Error('Page not found'), {}, 404);
      }
      return createResponse(res, 'ok', 'Page updated successfully.', page);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async deleteAncillaryPage(req: Request, res: Response) {
    try {
      await AncillaryPageService.deleteAncillaryPage(req.params.id);
      return createResponse(res, 'ok', 'Page deleted successfully.', {});
    } catch (error) {
      return createError(res, error);
    }
  }
}
