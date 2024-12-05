import { Request, Response } from 'express';
import MessageService from '../../services/messageService';
import { createError, createResponse } from '../../utils/helpers';

export default class MessageController {
  static async getMessages(req: Request, res: Response) {
    try {
      const messages = await MessageService.getMessages();
      return createResponse(res, 'ok', 'Messages retrieved successfully.', messages);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async createMessage(req: Request, res: Response) {
    try {
      const message = await MessageService.createMessage(req.body);
      return createResponse(res, 'ok', 'Message created successfully.', message, {}, 201);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async getMessageById(req: Request, res: Response) {
    try {
      const message = await MessageService.getMessageById(req.params.id);
      return message
        ? createResponse(res, 'ok', 'Message retrieved successfully.', message)
        : createError(res, 'Message not found', {}, 404);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async updateMessage(req: Request, res: Response) {
    try {
      const message = await MessageService.updateMessage(req.params.id, req.body);
      if (!message) {
        return createError(res, new Error('Message not found'), {}, 404);
      }
      return createResponse(res, 'ok', 'Message updated successfully.', message);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async deleteMessage(req: Request, res: Response) {
    try {
      await MessageService.deleteMessage(req.params.id);
      return createResponse(res, 'ok', 'Message deleted successfully.', {});
    } catch (error) {
      return createError(res, error);
    }
  }
}
