import { Request, Response } from 'express';
import { createError, createResponse } from '../../utils/helpers';
import RecognitionService from '../../services/recognitionService';

export default class RecognitionController {
  static async getRecognitions(req: Request, res: Response) {
    try {
      const recognitions = await RecognitionService.getRecognitions();
      return createResponse(res, 'ok', 'Recognitions retrieved successfully.', recognitions);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async createRecognition(req: Request, res: Response) {
    try {
      const recognition = await RecognitionService.createRecognition(req.body);
      return createResponse(res, 'ok', 'Recognition created successfully.', recognition, {}, 201);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async getRecognitionById(req: Request, res: Response) {
    try {
      const recognition = await RecognitionService.getRecognitionById(req.params.id);
      return recognition
        ? createResponse(res, 'ok', 'Recognition retrieved successfully.', recognition)
        : createError(res, 'Recognition not found', {}, 404);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async updateRecognition(req: Request, res: Response) {
    try {
      const recognition = await RecognitionService.updateRecognition(req.params.id, req.body);
      if (!recognition) {
        return createError(res, new Error('Recognition not found'), {}, 404);
      }
      return createResponse(res, 'ok', 'Recognition updated successfully.', recognition);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async deleteRecognition(req: Request, res: Response) {
    try {
      await RecognitionService.deleteRecognition(req.params.id);
      return createResponse(res, 'ok', 'Recognition deleted successfully.', {});
    } catch (error) {
      return createError(res, error);
    }
  }
}
