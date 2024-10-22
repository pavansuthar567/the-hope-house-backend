import { Request, Response } from 'express';
import GalleryService from '../../services/galleryService';
import { createError, createResponse } from '../../utils/helpers';

export default class GalleryController {
  static async getGallery(req: Request, res: Response) {
    try {
      const galleryItems = await GalleryService.getGallery();
      return createResponse(res, 'ok', 'Gallery items retrieved successfully.', galleryItems);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async createGalleryItem(req: Request, res: Response) {
    try {
      const galleryItem = await GalleryService.createGalleryItem(req.body);
      return createResponse(res, 'ok', 'Gallery item created successfully.', galleryItem, {}, 201);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async getGalleryItemById(req: Request, res: Response) {
    try {
      const galleryItem = await GalleryService.getGalleryItemById(req.params.id);
      return galleryItem
        ? createResponse(res, 'ok', 'Gallery item retrieved successfully.', galleryItem)
        : createError(res, 'Gallery item not found', {}, 404);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async updateGalleryItem(req: Request, res: Response) {
    try {
      const galleryItem = await GalleryService.updateGalleryItem(req.params.id, req.body);
      if (!galleryItem) {
        return createError(res, new Error('Gallery item not found'), {}, 404);
      }
      return createResponse(res, 'ok', 'Gallery item updated successfully.', galleryItem);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async deleteGalleryItem(req: Request, res: Response) {
    try {
      await GalleryService.deleteGalleryItem(req.params.id);
      return createResponse(res, 'ok', 'Gallery item deleted successfully.', {});
    } catch (error) {
      return createError(res, error);
    }
  }
}
